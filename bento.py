from flask import Flask, request, render_template, jsonify
import json
import sqlite3
import random
import time
import os
import model
from model import Folder, Document, Diff

app = Flask(__name__)

@app.route("/")
def home():
	return render_template('index.html', doc_type='folder', name='/', doc_id=1)

@app.route("/doc/<doc_id>")
def show_doc(doc_id):
	doc = model.get_document(doc_id)
	diff = model.get_head_diff(doc_id)
	print(doc)
	if not diff['parent']:
		diff['parent'] = 0

	return render_template('index.html', doc_type='text', name=doc.name, doc_id=doc_id)

@app.route("/api/path/", defaults={'path': '/'})
@app.route("/api/path/<path:path>")
def get_directory(path):
	try:
		folder = model.get_folder_from_path(path)
		if not folder:
			return jsonify({'result':'failure','reason':'path does not exist.'})
	except Exception as e:
		return jsonify({'result':'failure','reason':'path does not exist.','error':str(e)})
	folders, docs = model.get_folder_children(folder)
	print(folders,docs)
	
	return jsonify({'folders':folders,'documents':docs})

@app.route("/api/folder/<folder_id>")
def get_folder(folder_id):
	try:
		folder = model.get_folder(folder_id)
		if not folder:
			return jsonify({'result':'failure','reason':'path does not exist.'})
	except Exception as e:
		return jsonify({'result':'failure','reason':'path does not exist.','error':str(e)})
	folders, docs = model.get_folder_children(folder)
	print(folders,docs)
	
	return jsonify({'folders':folders,'documents':docs})
	
@app.route("/api/doc/<doc_id>")
def get_doc(doc_id):
	doc = model.get_document(doc_id)
	return jsonify(doc.dict())

@app.route("/api/doc/", methods=['POST'])
def new_doc():
	# Create the document.
	data = json.loads(request.data.decode('utf-8'))
	doc = Document()
	doc.name = data['name']
	doc.doc_type = 'text'
	doc.folder = model.get_folder_from_path(data['path']).id
	doc = model.save_document(doc)
	
	diff = Diff()
	diff.diff_hash = random.randint(0,2147483648)
	diff.document = doc.id
	diff.parent = None
	diff.author = data['author']
	diff.time = time.time()
	diff.content = ''
	
	model.save_diff(diff)
	return jsonify(doc.dict())

@app.route("/api/diff/<doc_id>", methods = ['POST'])
def post_diff(doc_id):
	data = json.loads(request.data.decode('utf-8'))
	diff = Diff()
	diff.diff_hash = data['hash']
	diff.document  = data['document']
	diff.parent    = data['parent']
	diff.content   = data['content']
	diff.author    = data['author']
	diff.time      = data['time']
	model.save_diff(diff)
	
	doc = model.get_document(doc_id)
	doc.apply_patch(data['content'])
	model.save_document(doc)

	return jsonify({"status":"success"})

@app.route("/api/diff/<docid>", methods = ['GET'])
def get_diff(docid):
	db = sqlite3.connect(db_name)
	cur = db.cursor()
	print(docid)
	cur.execute(diff_select.format(docid))
	data = cur.fetchone()
	cur.close()
	db.close()
	
	return json.dumps(data)

if __name__ == "__main__":
	app.run(debug=True)

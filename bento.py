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
	docs = model.get_documents()
	print('documents: {}'.format(docs))
	return render_template('index.html', docs=docs)

@app.route("/doc/<doc_id>")
def show_doc(doc_id):
	doc = model.get_document(doc_id)
	diff = model.get_head_diff(doc_id)
	print(doc)
	if not diff['parent']:
		diff['parent'] = 0
	
	return render_template('doc.html', doc_id = doc_id, parent=diff['parent'],
				content=doc.head, title=doc.name)
	
@app.route("/api/doc/", methods=['POST'])
def new_doc():
	# Create the document.
	data = json.loads(request.data.decode('utf-8'))
	print(data)
	doc = Document()
	doc.name = data['name']
	doc.doc_type = 'text'
	doc.path = model.get_folder_id(data['path'])
	
	doc = model.save_document(doc)
	
	diff = Diff()
	diff.diff_hash = random.randint(0,2147483648)
	diff.document = doc.id
	diff.parent = None
	diff.author = data['author']
	diff.time = time.time()
	diff.content = ''
	
	model.save_diff(diff)
	print('Returning dictionary: {}'.format(doc.dict()))
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
	doc.head = data['content']
	model.save_document(doc)

	return jsonify({"status":"success"})

@app.route("/api/diff/<docid>", methods = ['GET'])
def get_doc(docid):
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

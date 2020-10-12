from flask import Flask, request, render_template, jsonify
from flask_basicauth import BasicAuth
import json
import sqlite3
import random
import time
import os
import model
from model import Folder, Document, Diff, NoParentDiff

app = Flask(__name__)

class BentoAuth(BasicAuth):
	def check_credentials(self, username, password):
		users = json.load(open('./users.json'))
		if username in users:
			if users[username] == password:
				return True
		return False

if os.path.isfile('users.json'):
	basic_auth = BentoAuth(app)
	app.config['BASIC_AUTH_FORCE'] = True

@app.route("/")
def home():
	return render_template('index.html', doc_type='folder', name='/', doc_id=1, bg_color="dark")

@app.route('/folder/<folder_id>')
def show_folder(folder_id):
	try:
		folder = model.get_folder(folder_id)
		return render_template('index.html', doc_type='folder', name=folder.path, doc_id=folder_id, bg_color="dark")
	except Exception as e:
		pass
	return render_template('index.html', doc_type='folder', name='/', doc_id=folder_id, bg_color="dark")

@app.route("/doc/<doc_id>")
def show_doc(doc_id):
	doc = model.get_document(doc_id)
	diff = model.get_head_diff(doc_id)
	print(doc)
	if not diff['parent']:
		diff['parent'] = 0

	return render_template('index.html', doc_type='text', name=doc.name, doc_id=doc_id, bg_color="light")

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
	current_diff = model.get_head_diff(doc_id)
	return jsonify([doc.dict(),current_diff])

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
	
	model.save_diff(diff, override=True)
	return jsonify(doc.dict())

@app.route("/api/diff/<doc_id>", methods = ['POST'])
def post_diff(doc_id):
	data = json.loads(request.data.decode('utf-8'))
	diff = Diff()
	diff.diff_hash = data['diff_hash']
	diff.document  = data['document']
	diff.parent    = data['parent']
	diff.content   = data['content']
	diff.author    = data['author']
	diff.time      = data['time']
	try:
		model.save_diff(diff)
	except NoParentDiff:
		return jsonify({"status":"failure","reason":"The diff provided as parent did not exist.",
						"latest diff":model.get_head_diff(doc_id)})
	
	doc = model.get_document(doc_id)
	doc.apply_patch(data['content'])
	model.save_document(doc)

	return jsonify({"status":"success"})

@app.route("/api/diffs/<doc_id>", methods = ['POST'])
def post_diff_stack(doc_id):
	data = json.loads(request.data.decode('utf-8'))
	head = model.get_head_diff(doc_id)
	match = None
	
	pointer = len(data) - 1
	while not match and pointer >= 0:
		print('Searching for {}. currently at {}:{}'.format(head['diff_hash'],pointer,data[pointer]['parent']))
		if data[pointer]['parent'] == head['diff_hash']:
			match = pointer
		pointer -= 1
		
	# I'll have to make this more complex later, but dealing with it all now will keep me from 
	# ccomplishing anything. The problem with this is that the head of the document might have 
	# changed and the current editor may not be aware of that. But as I currently don't have to
	# worry about multiple users editing at the same time I'm going to just leave this failure case
	# in this simple form for now.
	if not match:
		return jsonify({'status':'failure','reason':'document head not in diffs.'})
	
	# Apply the diffs from the point where we found a parent match to the end to bring the backend
	# up to date with the front end.
	diffs = data[match:]
	doc = model.get_document(doc_id)
	for diff in diffs:
		new_diff = Diff()
		new_diff.diff_hash = diff['diff_hash']
		new_diff.document  = diff['document']
		new_diff.parent    = diff['parent']
		new_diff.content   = diff['content']
		new_diff.author    = diff['author']
		new_diff.time      = diff['time']
		model.save_diff(new_diff)
		doc.apply_patch(diff['content'])
	model.save_document(doc)
	
	return jsonify({'status':'success'})

@app.route("/api/diff/<doc_id>", methods = ['GET'])
def get_diff(doc_id):
	head = model.get_head_diff(doc_id)
	
	return jsonify(head)

if __name__ == "__main__":
	app.run(debug=True)

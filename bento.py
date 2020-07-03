from flask import Flask, request, render_template
import json
import sqlite3
import random
import time

app = Flask(__name__)

db = sqlite3.connect('docs.sql')
cur = db.cursor()
cur.execute("""CREATE TABLE IF NOT EXISTS Docs (DocID int PRIMARY KEY,Name text, Path text, Type text)""")
cur.execute("""CREATE TABLE IF NOT EXISTS Diffs (
					DiffHash int PRIMARY KEY, 
					DocID int, 
					Parent text, 
					Diff text, 
					Author text, 
					Time int)""")
#					FOREIGN KEY(DocID) REFERENCES Docs(DocID))""")
db.commit()
cur.close()

doc_insert = "INSERT INTO Docs(DocID, Name, Path, Type) VALUES(?,?,?,?)"
doc_select_all = "SELECT * FROM Docs"
doc_select = "SELECT * FROM Docs WHERE DocID=? ORDER BY Time DESC LIMIT 1"

diff_insert = "INSERT INTO Diffs Values({hash},{DocID},{parent},{diff},{author},{time})"
diff_insert = "INSERT INTO Diffs Values ({},{},'{}','{}','{}',{})"
diff_insert = "INSERT INTO Diffs(DiffHash, DocID, Parent, Diff, Author, Time) VALUES(?,?,?,?,?,?)"
diff_select = "SELECT * FROM Diffs WHERE DocID=? ORDER BY Time DESC LIMIT 1"

@app.route("/")
def home():
	db = sqlite3.connect('docs.sql')
	cur = db.cursor()
	cur.execute(doc_select_all)
	docs = cur.fetchall()
	cur.close()
	db.close()
	return render_template('index.html', docs=docs)

@app.route("/doc/<docid>")
def show_doc(docid):
	db = sqlite3.connect('docs.sql')
	cur = db.cursor()
	cur.execute(diff_select,(docid,))
	diff = cur.fetchall()
	cur.close()
	db.close()
	return render_template('doc.html', doc_id = docid, parent=diff[0][0])
	
@app.route("/api/doc/", methods=['POST'])
def new_doc():
	# Create the document.
	data = json.loads(request.data.decode('utf-8'))
	name = data['name']
	docid = random.randint(0,65536)
	doc_type = 'text'
	path = '/'
	db = sqlite3.connect('docs.sql')
	cur = db.cursor()
	cur.execute(doc_insert,(docid, name, path, doc_type))
	
	# And create it's initial diff
	diff = (random.randint(0,65536),docid,None,'',data['author'],time.time())
	cur.execute(diff_insert,diff)
	
	db.commit()
	cur.close()
	db.close()
	return json.dumps({"docid":docid, "name":name, "path":path, "type":doc_type})

@app.route("/api/diff/<docid>", methods = ['POST'])
def post_diff(docid):
	db = sqlite3.connect('docs.sql')
	cur = db.cursor()
	print(docid)
	data = json.loads(request.data.decode('utf-8'))
	print(data)
	insert_values = (data['hash'], data['DocID'], data['parent'], data['diff'], data['author'], data['time'])
	cur.execute(diff_insert, insert_values)
	db.commit()
	cur.close()
	db.close()
	return '{"status":"success"}'

@app.route("/api/diff/<docid>", methods = ['GET'])
def get_doc(docid):
	db = sqlite3.connect('docs.sql')
	cur = db.cursor()
	print(docid)
	cur.execute(diff_select.format(docid))
	data = cur.fetchone()
	cur.close()
	db.close()
	
	return json.dumps(data)

if __name__ == "__main__":
	app.run(debug=True)

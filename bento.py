from flask import Flask, request
import json
import sqlite3

app = Flask(__name__)

db = sqlite3.connect('docs.sql')
cur = db.cursor()
cur.execute("""CREATE TABLE IF NOT EXISTS Docs (DocID int PRIMARY KEY,Name text)""")
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

diff_insert = "INSERT INTO Diffs Values({hash},{DocID},{parent},{diff},{author},{time})"
diff_insert = "INSERT INTO Diffs Values ({},{},'{}','{}','{}',{})"

@app.route("/")
def home():
	return open('index.html').read()
	
@app.route("/doc/<docid>", methods = ['GET', 'POST'])
def post_dif(docid):
	db = sqlite3.connect('docs.sql')
	cur = db.cursor()
	print(docid)
	data = json.loads(request.data.decode('utf-8'))
	print(data)
	insert = diff_insert.format(data['hash'], data['DocID'], data['parent'], data['diff'], data['author'], data['time'])
	print(insert)
	cur.execute(insert)
	db.commit()
	cur.close()
	db.close()
	return '{"status":"success"}'

if __name__ == "__main__":
	app.run(debug=True)

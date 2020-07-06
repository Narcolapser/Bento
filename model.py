from sqlalchemy import create_engine, and_, desc
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.orm.attributes import InstrumentedAttribute
import os

db_name = 'docs.sql'
refresh = False
if db_name not in os.listdir('./'):
	refresh = True

engine = create_engine('sqlite:///{}'.format(db_name))
SqlSession = sessionmaker(bind=engine)
Base = declarative_base()

Base.dict = lambda self: {c.name: getattr(self, c.name) for c in self.__table__.columns}
Base.json = lambda self: str(self.dict()).replace("'",'"').replace('None','null')

doc_insert = "INSERT INTO Docs(DocID, Name, Path, Type) VALUES(?,?,?,?)"
doc_select_all = "SELECT * FROM Docs"
doc_select = "SELECT * FROM Docs WHERE DocID=?"

diff_insert = "INSERT INTO Diffs Values({hash},{DocID},{parent},{diff},{author},{time})"
diff_insert = "INSERT INTO Diffs Values ({},{},'{}','{}','{}',{})"
diff_insert = "INSERT INTO Diffs(DiffHash, DocID, Parent, Diff, Author, Time) VALUES(?,?,?,?,?,?)"
diff_select = "SELECT * FROM Diffs WHERE DocID=? ORDER BY Time DESC LIMIT 1"


def get_documents():
	session = SqlSession()
	query = session.query(Document)
	return [doc.dict() for doc in query]

def get_document(doc_id):
	session = SqlSession()
	query = session.query(Document).filter(Document.id==doc_id)
	return query[0].dict()

def save_document(document):
	session = SqlSession()
	session.add(document)
	session.commit()
	return document

def get_folder_id(path):
	session = SqlSession()
	query = session.query(Folder).filter(Folder.path==path)
	return query[0]

def save_diff(diff):
	session = SqlSession()
	session.add(diff)
	session.commit()
	return diff

def get_diff(diff_hash):
	session = SqlSession()
	query = session.query(Diff).filter(Diff.diff_hash==diff_hash)
	return query[0].dict()

def get_head_diff(doc_id):
	session = SqlSession()
	query = session.query(Diff).filter(Diff.document==doc_id).order_by(desc(Diff.time))
	return query[0].dict()


class Folder(Base):
	__tablename__ = 'folders'
	
	id = Column(Integer, primary_key=True)
	
	path = Column(String)
	
	documents = relationship("Document")

	def __repr__(self):
		return 'Folder( id: {} path: {})'.format(self.id, self.path)


class Document(Base):
	__tablename__ = 'docs'
	
	id = Column(Integer, primary_key=True)
	
	name = Column(String)
	doc_type = Column(String)
	folder = Column(Integer, ForeignKey('folders.id'))
	head = Column(String)
	
	diffs = relationship("Diff")
	
	def __repr__(self):
		return 'Doc( id: {} path: {} type: {})'.format(self.id, self.folder.path + self.name, self.doc_type)


class Diff(Base):
	__tablename__ = 'diffs'
	
	diff_hash = Column(Integer, primary_key=True)
	document = Column(Integer, ForeignKey('docs.id'))
	parent = None #Column(Integer, ForeignKey('diffs.diff_hash'))
	
	author = Column(String)
	time = Column(Integer)
	
	def __repr__(self):
		return 'Diff( id: {}, document: {})'.format(self.diff_hash, self.document)


Base.metadata.create_all(engine)

if refresh:
	session = SqlSession()
	f = Folder()
	f.path = '/'
	session.add(f)
	session.commit()
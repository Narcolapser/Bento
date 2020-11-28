from sqlalchemy import create_engine, and_, desc
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.orm.attributes import InstrumentedAttribute
from diff_match_patch import diff_match_patch
import difflib
import re
import os

_hdr_pat = re.compile("^@@ -(\d+),?(\d+)? \+(\d+),?(\d+)? @@$")

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

class NoParentDiff(Exception):
	pass

def _get_session():
	engine = create_engine('sqlite:///{}'.format(db_name))
	SqlSession = sessionmaker(bind=engine)
	#Base = declarative_base()
	return SqlSession()

def get_documents():
	session = _get_session()
	query = session.query(Document)
	return [doc.dict() for doc in query]

def get_document(doc_id):
	session = _get_session()
	query = session.query(Document).filter(Document.id==doc_id)
	return query[0]

def save_document(document):
	session = _get_session()
	cur_session = session.object_session(document)
	if cur_session:
		session = cur_session
	session.add(document)
	session.flush()
	session.commit()
	return document

def get_folder_from_path(path):
	session = _get_session()
	query = session.query(Folder).filter(Folder.path==path)
	if query.count():
		return query[0]
	else:
		return None

def get_folder(folder_id):
	session = _get_session()
	query = session.query(Folder).filter(Folder.id==folder_id)
	if query.count():
		return query[0]
	else:
		return None

def get_folder_children(folder):
	session = _get_session()
	#folder = session.query(Folder).filter(Folder.id==folder_id)[0]
	folders = [f.dict() for f in session.query(Folder).\
								filter(Folder.path.like('{}%'.format(folder.path))).\
								filter(Folder.id != folder.id)]
	docs = [doc.dict() for doc in session.query(Document).filter(Document.folder==folder.id)]
	return (folders,docs)

def save_diff(diff, override = False):
	session = _get_session()

	# The initial diff will not have a parent. It needs the ability to override this check.
	if not override:
		parent = get_diff(diff.parent)
		if not parent:
			print('Refusing diff as the parent is unknown.')
			raise NoParentDiff('The parent for this diff could not be found')

	session.add(diff)
	session.commit()
	return diff

def get_diff(diff_hash):
	session = _get_session()
	query = session.query(Diff).filter(Diff.diff_hash==diff_hash)
	results = [r for r in query]
	if len(results):
		return query[0].dict()
	else:
		return None

def get_head_diff(doc_id):
	session = _get_session()
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
	# The current state of the document:
	head = Column(String)
	
	diffs = relationship("Diff")
	
	def __repr__(self):
		path = '/'
		return 'Doc( id: {} path: {} type: {})'.format(self.id, path + str(self.name), self.doc_type)
		
	def apply_patch(self, patch, revert=False):
		dmp = diff_match_patch()
#		patches = dmp.patch_fromText(patch)
#		self.head = dmp.patch_apply(patches, self.head)
		self.head = self._apply_patch(self.head, patch, revert)
	
	def _apply_patch(self, head, patch, revert=False):
		"""
		Apply patch to string s to recover newer string.
		If revert is True, treat s as the newer string, recover older string.
		Copied from: https://gist.github.com/noporpoise/16e731849eb1231e86d78f9dfeca3abc
		"""
		if not head or head == '' :
			head = ' '
		print((patch,head))
		head_lines = head.splitlines(True)
		patch_lines = patch.splitlines(True)
		result = ''
		i = sl = 0
		(midx,sign) = (1,'+') if not revert else (3,'-')
		while i < len(patch_lines) and patch_lines[i].startswith(("---","+++")): i += 1 # skip header lines
		while i < len(patch_lines):
			header = _hdr_pat.match(patch_lines[i])
			if not header: raise Exception("Bad patch -- regex mismatch [line "+str(i)+"]")
			l = int(header.group(midx))-1 + (header.group(midx+1) == '0')
			if sl > l or l > len(head_lines):
				raise Exception("Bad patch -- bad line num [line "+str(i)+"]")
			result += ''.join(head_lines[sl:l])
			sl = l
			i += 1
			while i < len(patch_lines) and patch_lines[i][0] != '@':
				if i+1 < len(patch_lines) and patch_lines[i+1][0] == '\\': line = patch_lines[i][:-1]; i += 2
				else: line = patch_lines[i]; i += 1
				if len(line) > 0:
					if line[0] == sign or line[0] == ' ': result += line[1:]
					sl += (line[0] != sign)
		result += ''.join(head_lines[sl:])
		return result


class Diff(Base):
	__tablename__ = 'diffs'
	
	diff_hash = Column(Integer, primary_key=True)
	document = Column(Integer, ForeignKey('docs.id'))
	parent = Column(Integer, ForeignKey('diffs.diff_hash'))
	
	author = Column(String)
	time = Column(Integer)
	content = Column(String)
	
	def __repr__(self):
		return 'Diff( id: {}, document: {})'.format(self.diff_hash, self.document)


Base.metadata.create_all(engine)

if refresh:
	session = _get_session()
	f = Folder()
	f.path = '/'
	session.add(f)
	session.commit()

from http.server import HTTPServer, BaseHTTPRequestHandler

from io import BytesIO

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        index = open('index.html').read()
        self.wfile.write(index.encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        print(body)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'{"status":"success"}')

try:
    httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
    print('ready')
    httpd.serve_forever()
except KeyboardInterrupt:
    print('escaped')


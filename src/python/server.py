##
# Python http primitives do not play so well with this, better to use nginx in any case

import BaseHTTPServer
import ssl
import os

cert_path = os.path.join('../../test/server/', 'server-crt.pem')
key_path = os.path.join('../../test/server/', 'server-key.pem')
ca_path = os.path.join('../../test/server/', 'ca-crt.pem')

class MyRequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
  def _set_headers(self):
    self.send_response(200)
    self.send_header('Content-type', 'text')
    self.end_headers()

  def do_GET(self):
    self._set_headers()

    print dir(self.server)

    message = "hello world!\n"

    try:
      message = "hello %s!\n" % (self.server.socket.getpeername())
    except Exception as e:
      message = "error: %s\n" %  (e)

    self.wfile.write(message)


httpd = BaseHTTPServer.HTTPServer(('localhost', 4433), MyRequestHandler)
httpd.socket = ssl.wrap_socket(
  httpd.socket,
  certfile=cert_path,
  keyfile=key_path,
  ca_certs=ca_path,
  server_side=True,
  cert_reqs=ssl.CERT_REQUIRED
)
httpd.serve_forever()

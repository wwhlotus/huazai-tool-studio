#!/usr/bin/env python3
# 华仔效率工坊 本地静态服务
# 用法：python3 serve.py  （默认 0.0.0.0:9527）
import http.server
import socketserver
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", "9527"))
BIND = os.environ.get("BIND", "0.0.0.0")

# 这些资源内容基本不变（宠物精灵表等），强缓存一年且标记 immutable，
# 浏览器会直接从磁盘缓存读取，刷新页面不再发请求。
CACHE_IMMUTABLE = ('.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2')


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def end_headers(self):
        path = self.path.split('?')[0].lower()
        if path.endswith(CACHE_IMMUTABLE):
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        else:
            # 代码类资源仍走协商缓存，改完即时生效
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


os.chdir(ROOT)
socketserver.TCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer((BIND, PORT), Handler) as httpd:
    print(f"华仔效率工坊 running on http://{BIND}:{PORT} (ctrl+c to stop)")
    httpd.serve_forever()

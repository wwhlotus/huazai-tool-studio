#!/usr/bin/env bash
# 华仔效率工坊 · 本地启动脚本（macOS / Linux）
# 说明：本站为纯静态站点，由 Python 标准库提供本地服务（无需任何第三方依赖）。
set -e
cd "$(dirname "$0")"

PORT=9527
URL="http://localhost:$PORT"

if command -v python3 >/dev/null 2>&1; then
  echo "使用 python3 启动本地服务：$URL"
  python3 serve.py &
  SERVER_PID=$!
  sleep 2
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then
    open "$URL" >/dev/null 2>&1 || true
  else
    echo "请手动在浏览器打开：$URL"
  fi
  wait $SERVER_PID
else
  echo "未检测到 python3，尝试直接打开页面（Firefox 体验最佳）..."
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "index.html" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then
    open "index.html" >/dev/null 2>&1 || true
  else
    echo "请手动在浏览器打开 index.html"
  fi
fi

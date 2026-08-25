@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

set PORT=9527
set URL=http://localhost:%PORT%

REM 1) 优先使用内置便携 Python（无需安装，开箱即用）
if exist "runtime\python\python.exe" (
  start "华仔效率工坊" "runtime\python\python.exe" serve.py
  goto :open
)

REM 2) 回退：系统已安装的 Python
where python  >nul 2>nul && ( start "华仔效率工坊" python  serve.py & goto :open )
where py      >nul 2>nul && ( start "华仔效率工坊" py -3 serve.py & goto :open )
where python3 >nul 2>nul && ( start "华仔效率工坊" python3 serve.py & goto :open )

REM 3) 都没有 Python：直接打开页面（Firefox 体验最佳，Chrome/Edge 宠物渲染可能受限）
echo 未检测到 Python 运行环境，改为直接打开页面。
echo 提示：若使用 Chrome/Edge，因浏览器安全策略宠物动画可能不完整，建议用 Firefox 或先安装 Python。
start "" index.html
exit /b

:open
REM 等待服务启动后自动打开浏览器
timeout /t 2 >nul
start "" %URL%
echo 已在后台启动本地服务，浏览器即将打开 %URL%
echo 关闭本窗口不会停止服务；如需停止，请在任务栏结束 “python.exe” 进程。
pause

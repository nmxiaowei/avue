@echo off
setlocal enabledelayedexpansion

:: 设置编码为UTF-8
chcp 65001 >nul

echo 正在读取package.json中的版本号...

:: 使用findstr从package.json中提取版本号
for /f "tokens=2 delims=:, " %%a in ('findstr "version" package.json') do (
    set version=%%a
    :: 移除引号
    set version=!version:"=!
    goto :continue
)

:continue
:: 检查是否成功获取版本号
if "%version%"=="" (
    echo 无法从package.json中读取版本号！
    exit /b 1
)

echo 当前版本号: v%version%

:: 确认是否继续
set /p confirm=是否继续提交版本 v%version%？(y/n): 
if /i not "%confirm%"=="y" (
    echo 操作已取消。
    exit /b 0
)

:: 执行Git操作
echo 开始执行Git操作...

:: 1. 提交到dev分支
echo 正在提交到dev分支...
git add . || exit /b 1
git commit -m "build v%version%" || exit /b 1
git push origin dev || exit /b 1

:: 2. 创建标签
echo 正在创建标签 v%version%...
git tag -a v%version% -m "v%version%" || exit /b 1
git push origin v%version% || exit /b 1

:: 3. 切换到master分支
echo 正在切换到master分支...
git checkout master || exit /b 1

:: 4. 从dev分支同步文件到master，包括已删除文件
echo 正在从dev分支同步文件到master...
git restore --source=dev --staged --worktree -- . || exit /b 1

:: 5. 提交到master分支
echo 正在提交到master分支...
git add . || exit /b 1
git commit -m "build v%version%" || exit /b 1
git push origin master || exit /b 1

:: 6. 切回dev分支
echo 正在切回dev分支...
git checkout dev || exit /b 1

echo 版本 v%version% 发布完成！

endlocal

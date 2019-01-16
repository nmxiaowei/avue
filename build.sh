#!/bin/bash 

echo "打包文件"
yarn dev:build
echo "传输文件"
scp -r /examples/avue/** pig@139.224.200.249:/data/avue/avue
echo "部署成功"
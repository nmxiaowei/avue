#!/bin/bash 

echo "打包文件"
yarn dev:build
echo "传输文件"
scp -r ./examples/avue/** root@223.240.84.160:/data/avue/avue-doc
echo "部署成功"
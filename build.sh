#!/bin/bash 

echo "打包文件"
yarn dev:build
echo "传输文件"
sftp root@fengniaoai.com << EOM
  put -r ./examples/avue/** /mnt/website/avue
  bey
EOM
echo "部署成功"
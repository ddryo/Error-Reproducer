#!/bin/bash

#使い方 : $ bash ./bin/zip.sh

#上の階層へ
cd ..

#zプラグインファイルをip化
zip -r media-uploader-error.zip media-uploader-error -x "*/.*" "*/__*" "*bin*" "*node_modules*"

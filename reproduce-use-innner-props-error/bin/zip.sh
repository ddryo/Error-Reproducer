#!/bin/bash

#使い方 : $ bash ./bin/zip.sh

#上の階層へ
cd ..

#zプラグインファイルをip化
zip -r test-blocks-pro.zip test-blocks-pro -x "*/.*" "*/__*" "*bin*" "*node_modules*" "*vendor*" "*/src/**/*.js" "*phpcs.xml" "*gulpfile.js" "*README.md"

#設定ファイル系削除
zip --delete test-blocks-pro.zip  "test-blocks-pro/composer*" "test-blocks-pro/webpack*" "test-blocks-pro/package*"

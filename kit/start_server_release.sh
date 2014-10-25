#!/bin/bash
# start local server and live debug for special app
# @luoqin 
# 2014.10.24

# restart server
fis server stop;
fis server start --root './dist_tmp/app'  >> server.log 2>&1;

# before fis release, make sure fis-conf.js is under current directory, if not, please define it
fis release --watch --live --md5 --dest 'local-dev-tpl,local-dev-static' >> release.log 2>&1;

# if you ready to publish
# fis release --md5 --optimize --pack --domain --dest local-build

exit 0;

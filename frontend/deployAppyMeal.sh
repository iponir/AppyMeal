#! /bin/bash

docker run -d --rm -p 80:80 -v $PWD/default.conf:/etc/nginx/conf.d/default.conf -v $PWD:/usr/share/nginx/html:ro --name appy-meal nginx

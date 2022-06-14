#!/bin/sh 

backUpFolder=/home/user/backup/billing 
date_now=`date +%Y_%m_%d_%H_%M` 
backFileName=billing_$date_now 

cd $backUpFolder 
mkdir -p $backFileName 

mongodump -h 127.0.0.1:29572 -d billing -u user_billing_back -p digua_billing_233 -o $backFileName 

tar zcvf $backFileName.tar.gz $backFileName 

rm -rf $backFileName 

NODE_ENV=$backUpFolder@$backFileName node /home/user/tasks/upload.js

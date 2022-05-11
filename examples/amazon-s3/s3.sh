#!/bin/bash

set -xeuo pipefail

cd template
aws cloudformation deploy \
  --template ./microcms-iframe-app-amazon-s3.yml \
  --parameter-overrides "BucketName=$BUCKET_NAME" \
  --stack-name microcms-iframe-app-amazon-s3 \
  --capabilities CAPABILITY_NAMED_IAM
cd ../

d=$(mktemp -d)
for i in $(seq 10); do
  curl -sSL -o "$d/$i.png" "https://placehold.jp/dddddd/331cbf/300x150.png?text=$i"
done
aws s3 cp --recursive --acl public-read "$d" "s3://$BUCKET_NAME/"

# microcms-iframe-app-amazon-s3

## Getting Started

```sh
cd template
export BUCKET_NAME="microcms-iframe-app-amazon-s3-$(whoami)"
aws cloudformation deploy \
  --template ./microcms-iframe-app-amazon-s3.yml \
  --parameter-overrides "BucketName=$BUCKET_NAME" \
  --stack-name microcms-iframe-app-amazon-s3 \
  --capabilities CAPABILITY_NAMED_IAM
cd ../

export NEXT_PUBLIC_MICROCMS_ORIGIN=https://example.microcms.io
npm run dev
```

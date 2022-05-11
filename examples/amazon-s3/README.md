# microcms-iframe-app-amazon-s3

## Getting Started

Create S3 bucket and upload test images.

```sh
export BUCKET_NAME="microcms-iframe-app-amazon-s3-$(whoami)"
./setup.sh
```

Start server.

```sh
export BUCKET_NAME="microcms-iframe-app-amazon-s3-$(whoami)"
export NEXT_PUBLIC_MICROCMS_ORIGIN=https://example.microcms.io
npm run dev
```

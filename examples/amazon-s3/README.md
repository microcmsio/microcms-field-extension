# microcms-field-extension-app-amazon-s3

## Getting Started

Create S3 bucket and upload test images.

```sh
export BUCKET_NAME="microcms-field-extension-app-amazon-s3-$(whoami)"
./setup.sh
```

Start server.

```sh
export BUCKET_NAME="microcms-field-extension-app-amazon-s3-$(whoami)"
export NEXT_PUBLIC_MICROCMS_ORIGIN=https://example.microcms.io
npm run dev
```

## About the Node.js version

Node.js receives regular security updates.  
For security reasons, we recommend using
**the latest patch version of the major version you are using (e.g. 24.x)**.

For the latest security information, please refer to:  
https://nodejs.org/en/blog/vulnerability/

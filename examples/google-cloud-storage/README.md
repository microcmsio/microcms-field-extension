# microcms-field-extension-app-google-cloud-storage

## Getting Started

Create Google Cluud Storage bucket and upload test images.

```sh
export BUCKET_NAME="microcms-field-extension-app-amazon-gcs-$(whoami)"
./setup.sh
```

Start server.

```sh
export BUCKET_NAME="microcms-field-extension-app-amazon-gcs-$(whoami)"
export NEXT_PUBLIC_MICROCMS_ORIGIN=https://example.microcms.io
npm run dev
```

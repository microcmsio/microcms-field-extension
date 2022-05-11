#!/bin/bash

set -xeuo pipefail

gsutil mb "gs://${BUCKET_NAME:?}"

d=$(mktemp -d)
for i in $(seq 10); do
  curl -sSL -o "$d/$i.png" "https://placehold.jp/dddddd/331cbf/300x150.png?text=$i"
  gsutil cp "$d/$i.png" "gs://${BUCKET_NAME:?}"
done

gsutil iam ch allUsers:objectViewer "gs://${BUCKET_NAME:?}"

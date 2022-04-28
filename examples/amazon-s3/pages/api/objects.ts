// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as AWS from "aws-sdk";

type Data = { url: string }[];

const bucket = "microcms-iframe-app-amazon-s3-assets";

const s3 = new AWS.S3();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const objects = await s3.listObjectsV2({ Bucket: bucket }).promise();

  const contents = objects.Contents || [];

  return res.status(200).json(
    contents
      .filter((c) => c.Key)
      .map((c) => ({
        url: `https://${bucket}.s3.amazonaws.com/${c.Key}`,
      }))
  );
}

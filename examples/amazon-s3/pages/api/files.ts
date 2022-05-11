// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as AWS from "aws-sdk";

type Data = { url: string }[];

const bucket = process.env.BUCKET_NAME || "";

const s3 = new AWS.S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const objects = await s3.listObjectsV2({ Bucket: bucket }).promise();

  const contents = objects.Contents || [];

  return res.status(200).json(
    contents
      .filter((c) => c.Key)
      .map((c) => ({
        url: `https://s3.ap-northeast-1.amazonaws.com/${bucket}/${c.Key}`,
      }))
  );
}

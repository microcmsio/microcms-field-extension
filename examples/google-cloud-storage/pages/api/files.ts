// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";

type Data = {
  url: string;
}[];

const storage = new Storage();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const [files] = await storage.bucket(process.env.BUCKET_NAME || "").getFiles();
  const response = files.map((file) => ({
    url: `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${file.name}`,
  }));

  res.status(200).json(response);
}

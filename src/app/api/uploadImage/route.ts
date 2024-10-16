import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || ""
  }
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (file && typeof file === "object" && file.name) {
    const Body = (await file.arrayBuffer()) as Buffer;

    const key = `${process.env.AWS_BUCKET_FOLDER}/${randomUUID()}_${file.name}`;
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
      Body,
      ContentType: file.type
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const url = `https://${bucketName}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ url });
  } else {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
}

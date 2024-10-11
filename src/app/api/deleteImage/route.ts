import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { NextResponse } from "next/server";

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || ""
  }
});

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { error: "No image key provided" },
      { status: 400 }
    );
  }

  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: key
    };

    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting image" },
      { status: 500 }
    );
  }
}

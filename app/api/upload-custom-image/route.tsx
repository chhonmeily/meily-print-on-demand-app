import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/lib/imageKitInstance";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const fileName = formData.get("fileName") as string | null;
  if (!file || !fileName) {
    return NextResponse.json(
      { error: "Missing file or fileName" },
      { status: 400 }
    );
  }

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName,
      useUniqueFileName: false,
      isPrivateFile: false,
    });

    return NextResponse.json({ url: uploadResponse.url });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

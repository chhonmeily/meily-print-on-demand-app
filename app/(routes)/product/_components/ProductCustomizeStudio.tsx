import { Product } from "@/app/_components/PopularProducts";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Crop, ImageOff, ImageUpscale, Upload } from "lucide-react";
import { Canvas, FabricImage } from "fabric";
import axios from "axios";
type Props = {
  product: Product;
};

function ProductCustomizeStudio({ product }: Props) {
  const canvasRef = useRef<any>(null);
  const [canvasInstance, setCanvasInstance] = useState<any>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 180,
        height: 180,
        backgroundColor: "transparent",
      });
      initCanvas.renderAll();
      setCanvasInstance(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvasInstance) {
      addDefaultImageToCanvas();
    }
  }, [canvasInstance]);

  const addDefaultImageToCanvas = async () => {
    const canvasImageRef = await FabricImage.fromURL(
      "https://ik.imagekit.io/cml9999/strapi-uploads/logoipsum-354.png?updatedAt=1754705261429"
    );
    canvasImageRef.scaleX = 0.3;
    canvasImageRef.scaleY = 0.3;
    canvasInstance.add(canvasImageRef);
    canvasInstance.renderAll();
  };

  const onHandleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // call upload custom image api
    const file = event.target.files?.[0];
    if (file) {
      const imageRefUrl = await uploadCustomImage(file);
      //show to canvas
      const uploadedImageUrl = imageRefUrl;
      if (uploadedImageUrl) {
        canvasInstance.clear();
        canvasInstance.renderAll();
        const canvasImageRef = await FabricImage.fromURL(uploadedImageUrl);
        canvasImageRef.scaleX = 0.1;
        canvasImageRef.scaleY = 0.1;
        canvasInstance.add(canvasImageRef);
        canvasInstance.renderAll();
      }
    }
  };

  const uploadCustomImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const response = await axios.post("/api/upload-custom-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center h-[400px] w-[400px]">
        <div className="flex items-center justify-center h-full w-full relative">
          <Image
            src={product?.productImage[0]?.url}
            alt={product?.title}
            width={400}
            height={400}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <canvas
              id="canvas"
              ref={canvasRef}
              className="border rounded-2xl border-dashed"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 my-5">
        <label htmlFor="uploadImage">
          <div className="flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer hover:bg-blue-50">
            <Upload />
            <span className="text-lg">Upload Image</span>
          </div>
        </label>
        <input
          type="file"
          className="hidden"
          id="uploadImage"
          onChange={onHandleImageUpload}
        />
        <div className="flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer hover:bg-blue-50">
          <ImageOff />
          <span className="text-lg">BG Remove</span>
        </div>
        <div className="flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer hover:bg-blue-50">
          <ImageUpscale />
          <span className="text-lg">Upscale</span>
        </div>
        <div className="flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer hover:bg-blue-50">
          <Crop />
          <span className="text-lg">SmartCrop</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCustomizeStudio;

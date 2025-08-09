import { Product } from "@/app/_components/PopularProducts";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Crop, ImageOff, ImageUpscale, Upload } from "lucide-react";
import { Canvas, FabricImage } from "fabric";
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
      // const ctx = canvas.getContext("2d");
      // if (ctx) {
      //   // Set canvas dimensions
      //   canvas.width = 400;
      //   canvas.height = 400;

      //   // Draw product image on the canvas
      //   const img = new Image();
      //   img.src = product?.productImage[0]?.url || "";
      //   img.onload = () => {
      //     ctx.clearRect(0, 0, canvas.width, canvas.height);
      //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      //   };
      // }
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
        <div className="flex flex-col p-5 items-center border rounded-lg hover:border-primary cursor-pointer hover:bg-blue-50">
          <Upload />
          <span className="text-lg">Upload Image</span>
        </div>
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

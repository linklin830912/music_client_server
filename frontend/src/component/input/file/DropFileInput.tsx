import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import style from "./dropFileInputStyle.module.css";

type dropFileInputProps = {
  onImageDataLoaded: (data: dropFileOutputType) => void;
  children: string | JSX.Element | JSX.Element[];
};
export type dropFileOutputType = {
  data: Uint8ClampedArray;
  imageWidth: number;
  imageHeight: number;
};

const DropFileInput = (props: dropFileInputProps) => {
  const form = useFormContext();
  const { setValue } = form;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setValue("isLoadingImageAnalysis", isLoading);
  // }, [isLoading, setValue]);
  return (
    <>
      <div className={style.container_div}>
        <input type="file" accept="image/*" onChange={handleUpload} />
        <div className={style.display_div}>{props.children}</div>
        <canvas width={150} height={150} ref={canvasRef} />
      </div>
    </>
  );

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setValue("isLoadingImageAnalysis", true);
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = handleReaderLoadend;
    }
  }

  function handleReaderLoadend(e: ProgressEvent<FileReader>) {
    const image = new Image();
    if (typeof e.target?.result === "string") {
      image.src = e.target?.result;
      image.onload = drawToCanvas;
    }
    function drawToCanvas(e: Event) {
      if (canvasRef.current) {
        var ctx = canvasRef.current.getContext("2d"); // Creates a contect object
        canvasRef.current.width = image.width; // Assigns image's width to canvas
        canvasRef.current.height = image.height; // Assigns image's height to canvas
        if (ctx) {
          ctx.drawImage(image, 0, 0); // Draws the image on canvas

          const imageData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          props.onImageDataLoaded({
            data: imageData.data,
            imageWidth: canvasRef.current.width,
            imageHeight: canvasRef.current.height,
          });
        }
      }
    }
  }
};

export default DropFileInput;

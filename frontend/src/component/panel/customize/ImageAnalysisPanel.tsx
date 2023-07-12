import React, {
  useRef,
  useState,
  useEffect,
  MouseEventHandler,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "../../../app/hook";
import { getColorPaletteClass } from "../../../model/color/colorPalette";
import {
  mapImageDataToUniqueRgbClusters,
  mapToRgbString,
} from "../../../utils/color/mapImageDataToUniqueRgb";
import DropFileInput, {
  dropFileOutputType,
} from "../../input/file/DropFileInput";
import axios, { AxiosResponse } from "axios";

type imageAnalysisPanelProps = {
  children: string | JSX.Element | JSX.Element[];
};

const ImageAnalysisPanel = (props: imageAnalysisPanelProps) => {
  const form = useFormContext();
  const { setValue } = form;

  const [fileOutput, setFileOutput] = useState<
    dropFileOutputType | undefined
  >();
  // let count = 1;
  // setInterval(() => {
  //   console.log(count);
  //   count++;
  // }, 1000);
  let count = 0;

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     count++;
  //     console.log("!!!counting...", count);
  //   }, 1000);
  //   if (count > 5) {
  //     clearInterval(id);
  //   }
  //   console.log("!!!end");
  // }, [fileOutput]);

  const [formData, setFormData] = useState<Uint8ClampedArray | undefined>(
    undefined
  );

  const apiUrl =
    "https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-tlyla/endpoint/uploadImageRgb";

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "post",
        url: apiUrl,
        data: formData,
        params: {
          selectColorCount: 20,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      console.log("Post created:", response.data);
      // You can perform any further actions with the response data here
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    setFormData(fileOutput?.data);
    console.log("!!!fileOutput?.data", fileOutput?.data?.toString());
  }, [fileOutput]);

  return (
    <>
      <DropFileInput onImageDataLoaded={setFileOutput}>
        {props.children}
      </DropFileInput>
    </>
  );

  async function getRgbAnalysis(data: Uint8ClampedArray, canvasWidth: number) {
    const rgbGrps = await mapImageDataToUniqueRgbClusters(data, canvasWidth);
    return rgbGrps;
  }
  function mapRgbGroupsToUniqueRgb(rgbGroups: Uint8ClampedArray[][]) {
    setValue("candidateColors", mapToRgbString(rgbGroups.map((x) => x[0]))); //seed
  }
};
export default ImageAnalysisPanel;

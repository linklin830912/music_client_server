import React, { useState, useEffect } from "react";
import { noteCollectionSVGProps } from "./NoteCollectionSVG";
import NoteCollectionAudio from "./NoteCollectionAudio";

type noteCollectionProps = {
  isRecording: boolean;
  isBeatOn: boolean;
  beat: number;
  beatPattern: boolean[];
  beatPatternSvgGId: string;
  svgProps: noteCollectionSVGProps;
};
const NoteCollection = (props: noteCollectionProps) => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  useEffect(() => {
    if (!props.isRecording) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }, [props.isRecording]);

  return (
    <>
      {stream !== undefined && props.isRecording && (
        <>
          <NoteCollectionAudio
            stream={stream}
            beat={props.beat}
            beatPattern={props.beatPattern}
            isRecording={props.isRecording}
            svgProps={props.svgProps}
            beatPatternSvgGId={props.beatPatternSvgGId}
          />
        </>
      )}
    </>
  );

  async function getMicrophone() {
    const strm = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setStream(strm);
  }

  function stopMicrophone() {
    stream?.getTracks()?.forEach((track) => track.stop());
    setStream(undefined);
  }
};

export default NoteCollection;

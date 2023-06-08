import { PitchDetector } from "pitchy";
import React, { useEffect, useState } from "react";
import NoteCollectionSVG, { noteCollectionSVGProps } from "./NoteCollectionSVG";
import { mapBeatToBeatFrequency } from "../../../utils/record/mapBeatToBeatFrequency";

type noteCollectionAudioProps = {
  stream: MediaStream;
  isRecording: boolean;
  svgProps: noteCollectionSVGProps;
  beat: number;
  beatPattern: boolean[];
  beatPatternSvgGId: string;
};
const NoteCollectionAudio = (props: noteCollectionAudioProps) => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>(
    undefined
  );
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | undefined>(
    undefined
  );
  const [source, setSource] = useState<MediaStreamAudioSourceNode | undefined>(
    undefined
  );
  const [detector, setDetector] = useState<
    PitchDetector<Float32Array> | undefined
  >(undefined);
  const [input, setInput] = useState<Float32Array | undefined>(undefined);

  const [ptch, setPitch] = useState<number>(0);
  const [clarty, setClarity] = useState<number>(0);

  useEffect(() => {
    if (props.stream) {
      const audioContxt = new window.AudioContext();
      const analyserNd = audioContxt.createAnalyser();
      const src = audioContxt?.createMediaStreamSource(props.stream);
      src.connect(analyserNd);
      const detectr = PitchDetector.forFloat32Array(analyserNd.fftSize);
      const inpt = new Float32Array(detectr.inputLength);

      setAudioContext(audioContxt);
      setAnalyserNode(analyserNd);
      setSource(src);
      setDetector(detectr);
      setInput(inpt);
    }
  }, [props.stream]);

  useEffect(() => {
    if (audioContext?.sampleRate && analyserNode && detector && input) {
      let refId = 0;

      const startRecording = () => {
        analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(
          input,
          audioContext.sampleRate
        );
        if (props.isRecording) {
          refId = window.requestAnimationFrame(startRecording);
          if (refId) {
            setPitch(pitch);
            setClarity(clarity);
          }
        }
      };

      refId = window.requestAnimationFrame(startRecording);
      return () => {
        cancelAnimationFrame(refId);
        analyserNode?.disconnect();
        source?.disconnect();
      };
    }
  }, [props.isRecording, audioContext, analyserNode, detector, input]);

  return (
    <>
      <NoteCollectionSVG
        positions={props.svgProps.positions}
        width={props.svgProps.width}
        height={props.svgProps.height}
        noteLimitCount={props.svgProps.noteLimitCount}
        unitLength={props.svgProps.unitLength}
        isHorizontal={props.svgProps.isHorizontal}
        mainColor={props.svgProps.mainColor}
        startNote={props.svgProps.startNote}
        startPosition={props.svgProps.startPosition}
        unitNoteLength={props.svgProps.unitNoteLength}
        unitBeatHeight={props.svgProps.unitBeatHeight}
        pitchy={{ pitch: ptch, clarity: clarty }}
        beat={props.beat}
        beatPattern={props.beatPattern}
        beatFrequency={mapBeatToBeatFrequency(props.beat)}
        beatPatternSvgGId={props.beatPatternSvgGId}
      />
    </>
  );
};
export default NoteCollectionAudio;

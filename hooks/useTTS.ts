import { useState, useCallback } from "react";
import { KokoroTTS, TextSplitterStream } from "kokoro-js-zh";
import { useTranslation } from 'react-i18next';

interface TTSState {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  progress: number;
}

type TTSGlobal = { model: KokoroTTS | null };
const g = globalThis as any;
let __TTS: TTSGlobal = g.__TTS || { model: null };
g.__TTS = __TTS;

export const useTTS = ({ modelConfig = {
  modelName: "onnx-community/Kokoro-82M-v1.0-ONNX",
  dtype: "fp32",
  device: "webgpu"
} }: { modelConfig: { modelName: string; dtype: 'fp32' | 'fp16'; device: 'webgpu' | 'wasm' } }) => {
  const [state, setState] = useState<TTSState>({
    isLoading: false,
    isReady: !!__TTS.model,
    error: null,
    progress: __TTS.model ? 100 : 0,
  });

  const { i18n } = useTranslation();

  const load = async () => {
    if (__TTS.model) return __TTS.model;
    setState((p) => ({ ...p, isLoading: true, error: null, progress: 0 }));
    try {
      const tts = await KokoroTTS.from_pretrained(modelConfig.modelName, {
        dtype: modelConfig.dtype,
        device: modelConfig.device,
        progress_callback: (item) => {
          console.log(item);
          if (item.status === "progress" && item.file?.endsWith?.("onnx")) {
            setState((p) => ({ ...p, progress: item.progress || 0 }));
          }
        },
        envConfig: {
          remoteHost: location.origin,
          remotePathTemplate: `{model}/`,
          wasmPaths: `${location.origin}/onnx-wasm/`
        }
      });
      __TTS.model = tts;
      setState((p) => ({
        ...p,
        isLoading: false,
        isReady: true,
        progress: 100,
      }));
      return tts;
    } catch (error) {
      setState((p) => ({
        ...p,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load TTS model",
      }));
      throw error;
    }
  };

  const stream = useCallback((onAudioChunk: (chunk: { audio: Float32Array; text?: string }) => void) => {
    const tts = __TTS.model as KokoroTTS | null;
    if (!tts) throw new Error("TTS model not loaded. Call load() first.");
    const splitter = new TextSplitterStream();
    const ttsStream = tts.stream(splitter, {
      voice: i18n.language === 'zh-CN' ? "zm_yunjian" : "af_maple" as any
    });
    console.log(tts.list_voices());
    const ttsPromise = (async () => {
      for await (const chunk of ttsStream) {
        if (chunk.audio) {
          onAudioChunk({ audio: chunk.audio.audio, text: chunk.text });
        }
      }
    })();
    return { splitter, ttsPromise };
  }, []);

  return {
    ...state,
    load,
    stream,
  };
};

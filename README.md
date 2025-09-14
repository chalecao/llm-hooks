# 🧠 LLM Hooks
中文:[README.zh-CN.md](README.zh-CN.md)

A powerful collection of React hooks for AI and LLM (Large Language Model) functionalities, featuring WebGPU acceleration and real-time streaming capabilities.

🌐 **Live Documentation**: [https://w3pua.com/tool/llm-hooks/](https://w3pua.com/tool/llm-hooks/)
🌐 **在线文档**: [https://w3pua.com/tool/llm-hooks/](https://w3pua.com/tool/llm-hooks/)

## ✨ Features

- **⚡ WebGPU Accelerated**: Run AI models directly in the browser with GPU acceleration
- **🎯 Real-time Streaming**: Stream tokens and audio in real-time
- **🌐 Multi-language Support**: Built-in support for Chinese and English
- **🔧 TypeScript Ready**: Full TypeScript support with detailed type definitions
- **📦 Tree Shaking**: Import only what you need

### Available Hooks

| Hook | Description | Icon |
|------|-------------|------|
| `useTypingEffect` | Typing animation effect with customizable speed | ⌨️ |
| `useFetchStream` | Handle streaming fetch requests with real-time data processing | 🌊 |
| `useLLM` | Run large language models in browser with WebGPU acceleration | 🧠 |
| `useTTS` | Text-to-speech synthesis with multiple voice profiles | 🔊 |

## 🚀 Installation

### Core Package
```bash
npm install llm-hooks
```

### AI Dependencies (Optional - install as needed)
```bash
# For useLLM hook - Language models
npm install @huggingface/transformers

# For useTTS hook - Text-to-speech
npm install kokoro-js-zh

# For internationalization (if needed)
npm install i18next react-i18next
```

## 📖 Quick Start

### Basic Usage
```jsx
import { useTypingEffect, useFetchStream } from 'llm-hooks';

function MyComponent() {
  const animatedText = useTypingEffect('Hello World!', 50);
  const { data, loading } = useFetchStream('/api/stream');
  
  return <div>{animatedText}</div>;
}
```

### Advanced AI Usage
```jsx
import { useLLM, useTTS } from 'llm-hooks';

function AIChat() {
  const { load: loadLLM, generate, isReady: llmReady } = useLLM({
    modelConfig: { modelName: "gemma-3-270m-it-ONNX" }
  });
  
  const { load: loadTTS, stream: streamTTS, isReady: ttsReady } = useTTS();

  const handleChat = async (message) => {
    // Load models if needed
    if (!llmReady) await loadLLM();
    if (!ttsReady) await loadTTS();
    
    // Real-time LLM + TTS streaming
    const { splitter, ttsPromise } = streamTTS(({ audio, text }) => {
      audioWorkletNode.port.postMessage(audio);
      if (text) pendingTexts.push(text);
    });

    const llmPromise = generate(
      [{ role: "user", content: message }],
      (token) => setOutput(prev => prev + token),
      splitter
    );

    await Promise.all([llmPromise, ttsPromise]);
  };
}
```

## 🎯 Individual Hook Usage

### useTypingEffect
```jsx
import { useTypingEffect } from 'llm-hooks/useTypingEffect';

function TypingDemo() {
  const text = useTypingEffect('This text types itself!', 30);
  return <div>{text}</div>;
}
```

### useFetchStream
```jsx
import { useFetchStream } from 'llm-hooks/useFetchStream';

function StreamDemo() {
  const { data, error, loading } = useFetchStream('/api/chat');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
}
```

### useLLM
```jsx
import { useLLM } from 'llm-hooks/useLLM';

function LLMDemo() {
  const { load, generate, isReady, progress } = useLLM({
    envConfig: {
      remoteHost: 'https://your-model-host.com',
      remotePathTemplate: '{model}/',
      wasmPaths: '/onnx-wasm/'
    },
    modelConfig: {
      modelName: "onnx-community/gemma-3-270m-it-ONNX",
      dtype: "fp32",
      device: "webgpu"
    }
  });

  if (!isReady) return <button onClick={load}>Load Model ({progress}%)</button>;
  
  return <button onClick={() => generate([{ role: "user", content: "Hello" }])}>
    Generate
  </button>;
}
```

### useTTS
```jsx
import { useTTS } from 'llm-hooks/useTTS';

function TTSDemo() {
  const { load, stream, isReady } = useTTS({
    modelConfig: {
      modelName: "onnx-community/Kokoro-82M-v1.0-ONNX",
      dtype: "fp32",
      device: "webgpu"
    }
  });

  const speak = async () => {
    await load();
    const { splitter } = stream(({ audio }) => {
      audioContext.decodeAudioData(audio);
    });
    
    splitter.push('Hello world!');
    splitter.close();
  };

  return <button onClick={speak} disabled={!isReady}>Speak</button>;
}
```

## 🔧 Advanced Integration

### Real-time LLM + TTS Synergy
```jsx
// Intelligent text chunking for TTS
const tokens = language === 'zh-CN' 
  ? text.split(/[。]/g)           // Chinese sentence splitting
  : text.match(/\s*\S+/g);        // English word splitting

for (const token of tokens) {
  splitter.push(token + '\n');
  await new Promise(resolve => setTimeout(resolve, 10)); // Control pacing
}
```

### Error Handling
```jsx
try {
  await generate(messages, onToken, splitter);
} catch (error) {
  console.error('Generation failed:', error);
  // Automatic cleanup and retry logic
}
```

## 📊 API Reference

### useLLM Configuration
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelConfig.modelName` | string | ✅ | HuggingFace model identifier |
| `modelConfig.dtype` | 'fp32' \| 'fp16' | ❌ | Precision (default: 'fp32') |
| `modelConfig.device` | 'webgpu' \| 'wasm' | ❌ | Inference device (default: 'webgpu') |

### useTTS Configuration
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `modelConfig.modelName` | string | ✅ | TTS model identifier |
| `modelConfig.dtype` | 'fp32' \| 'fp16' | ❌ | Precision (default: 'fp32') |
| `modelConfig.device` | 'webgpu' \| 'wasm' | ❌ | Inference device (default: 'webgpu') |

## 🌐 Browser Support

- ✅ Modern browsers with WebGPU support (Chrome 113+, Edge 113+)
- ✅ Fallback to WebAssembly when WebGPU is unavailable
- ✅ Progressive enhancement for older browsers

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- 📖 [Full Documentation](https://w3pua.com/tool/llm-hooks/)
- 🐛 [Report Issues](https://github.com/chalecao/llm-hooks/issues)
- 💬 [Discussions](https://github.com/chalecao/llm-hooks/discussions)
- 📦 [NPM Package](https://www.npmjs.com/package/llm-hooks)

---

Built with ❤️ using React, WebGPU, and modern web technologies.
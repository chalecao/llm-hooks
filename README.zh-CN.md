# 🧠 LLM Hooks

一套强大的React hooks集合，专为AI和大语言模型(LLM)功能设计，支持WebGPU加速和实时流式处理。

🌐 **在线文档**: [https://w3pua.com/tool/llm-hooks/](https://w3pua.com/tool/llm-hooks/)

## ✨ 特性

- **⚡ WebGPU 加速**: 在浏览器中直接运行AI模型，GPU硬件加速
- **🎯 实时流式处理**: 支持token和音频的实时流式输出
- **🌐 多语言支持**: 内置中英文支持
- **🔧 TypeScript 支持**: 完整的类型定义
- **📦 Tree Shaking**: 按需导入，减小打包体积

### 可用的 Hooks

| Hook | 描述 | 图标 |
|------|-------------|------|
| `useTypingEffect` | 打字机动画效果，可自定义速度 | ⌨️ |
| `useFetchStream` | 处理流式请求，实时数据处理 | 🌊 |
| `useLLM` | 浏览器内运行大语言模型，WebGPU加速 | 🧠 |
| `useTTS` | 文本转语音合成，多语音配置 | 🔊 |

## 🚀 安装

### 核心包
```bash
npm install llm-hooks
```

### AI 依赖（可选 - 按需安装）
```bash
# useLLM hook - 语言模型
npm install @huggingface/transformers

# useTTS hook - 文本转语音
npm install kokoro-js-zh

# 国际化支持（如果需要）
npm install i18next react-i18next
```

## 📖 快速开始

### 基础用法
```jsx
import { useTypingEffect, useFetchStream } from 'llm-hooks';

function MyComponent() {
  const animatedText = useTypingEffect('你好世界！', 50);
  const { data, loading } = useFetchStream('/api/stream');
  
  return <div>{animatedText}</div>;
}
```

### 高级AI用法
```jsx
import { useLLM, useTTS } from 'llm-hooks';

function AIChat() {
  const { load: loadLLM, generate, isReady: llmReady } = useLLM({
    modelConfig: { modelName: "gemma-3-270m-it-ONNX" }
  });
  
  const { load: loadTTS, stream: streamTTS, isReady: ttsReady } = useTTS();

  const handleChat = async (message) => {
    // 按需加载模型
    if (!llmReady) await loadLLM();
    if (!ttsReady) await loadTTS();
    
    // 实时LLM + TTS流式处理
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

## 🎯 单独Hook使用

### useTypingEffect
```jsx
import { useTypingEffect } from 'llm-hooks/useTypingEffect';

function TypingDemo() {
  const text = useTypingEffect('这段文字会自动打字！', 30);
  return <div>{text}</div>;
}
```

### useFetchStream
```jsx
import { useFetchStream } from 'llm-hooks/useFetchStream';

function StreamDemo() {
  const { data, error, loading } = useFetchStream('/api/chat');
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
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

  if (!isReady) return <button onClick={load}>加载模型 ({progress}%)</button>;
  
  return <button onClick={() => generate([{ role: "user", content: "你好" }])}>
    生成文本
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
    
    splitter.push('你好世界！');
    splitter.close();
  };

  return <button onClick={speak} disabled={!isReady}>播放语音</button>;
}
```

## 🔧 高级集成

### 实时LLM + TTS协同
```jsx
// 智能文本分块处理
const tokens = language === 'zh-CN' 
  ? text.split(/[。]/g)           // 中文按句号分割
  : text.match(/\s*\S+/g);        // 英文按单词分割

for (const token of tokens) {
  splitter.push(token + '\n');
  await new Promise(resolve => setTimeout(resolve, 10)); // 控制节奏
}
```

### 错误处理
```jsx
try {
  await generate(messages, onToken, splitter);
} catch (error) {
  console.error('生成失败:', error);
  // 自动清理和重试逻辑
}
```

## 📊 API 参考

### useLLM 配置
| 参数 | 类型 | 必需 | 描述 |
|-----------|------|----------|-------------|
| `modelConfig.modelName` | string | ✅ | HuggingFace模型标识符 |
| `modelConfig.dtype` | 'fp32' \| 'fp16' | ❌ | 精度（默认: 'fp32'） |
| `modelConfig.device` | 'webgpu' \| 'wasm' | ❌ | 推理设备（默认: 'webgpu'） |

### useTTS 配置
| 参数 | 类型 | 必需 | 描述 |
|-----------|------|----------|-------------|
| `modelConfig.modelName` | string | ✅ | TTS模型标识符 |
| `modelConfig.dtype` | 'fp32' \| 'fp16' | ❌ | 精度（默认: 'fp32'） |
| `modelConfig.device` | 'webgpu' \| 'wasm' | ❌ | 推理设备（默认: 'webgpu'） |

## 🌐 浏览器支持

- ✅ 支持WebGPU的现代浏览器（Chrome 113+, Edge 113+）
- ✅ WebGPU不可用时回退到WebAssembly
- ✅ 对旧浏览器的渐进增强支持

## 🤝 贡献

欢迎贡献代码！请随时提交issue和pull request。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m '添加 amazing-feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 📝 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 链接

- 📖 [完整文档](https://w3pua.com/tool/llm-hooks/)
- 🐛 [问题反馈](https://github.com/chalecao/llm-hooks/issues)
- 💬 [讨论区](https://github.com/chalecao/llm-hooks/discussions)
- 📦 [NPM 包](https://www.npmjs.com/package/llm-hooks)

---

使用 React、WebGPU 和现代 Web 技术构建，用心打造 ❤️
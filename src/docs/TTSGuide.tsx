import React, { useState } from 'react';

const TTSGuide = () => {
  const [demoText, setDemoText] = useState('你好，这是一个文本转语音的演示');

  return (
    <div>
      <div className="card">
        <h1 className="api-header">🔊 useTTS Hook</h1>
        <p>Run text-to-speech models directly in the browser using WebGPU for real-time audio synthesis.</p>
      </div>

      <div className="card">
        <h2>🎯 Usage</h2>
        <pre>
          <code>{`import { useTTS } from 'llm-hooks';

function TTSComponent() {
  const { 
    isLoading, 
    isReady, 
    error, 
    progress, 
    load, 
    stream 
  } = useTTS({
    modelConfig: {
      modelName: "onnx-community/Kokoro-82M-v1.0-ONNX",
      dtype: "fp32", 
      device: "webgpu"
    }
  });

  const handleSpeak = async () => {
    await load();
    
    // 方式1: 直接使用stream回调
    const { splitter, ttsPromise } = stream(({ audio, text }) => {
      // 处理音频数据（发送到AudioWorklet等）
      audioWorkletNode.port.postMessage(audio);
      if (text) {
        // 处理文本分段
        pendingTexts.push(text);
        tryResolveText();
      }
    });

    // 方式2: 配合LLM使用时
    const llmPromise = generate(
      [{ role: "user", content: userMessage }],
      (token: string) => {
        previewTempText += token;
        setPreviewText(prev => prev + token);
      },
      splitter,
    );

    // 等待LLM和TTS都完成
    await Promise.all([llmPromise, ttsPromise]);

    // 方式3: 手动推送文本（支持中英文分词）
    const previewTempText = "这是要合成的文本。可以分成多个句子。";
    const tokens = i18n.language === 'zh-CN' 
      ? previewTempText.split(/[。]/g) 
      : previewTempText.match(/\s*\S+/g);
    
    for (const token of tokens || []) {
      splitter.push(token + '\n');
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  };

  if (!isReady) return <button onClick={load}>Load TTS Model ({progress}%)</button>;
  return <button onClick={handleSpeak}>Speak</button>;
}`}</code>
        </pre>
      </div>

      <div className="card">
        <h2>⚙️ Configuration</h2>
        <table className="param-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>modelConfig.modelName</code></td>
              <td>string</td>
              <td>✅</td>
              <td>Kokoro TTS model identifier</td>
            </tr>
            <tr>
              <td><code>modelConfig.dtype</code></td>
              <td>'fp32' | 'fp16'</td>
              <td>❌</td>
              <td>Precision (default: 'fp32')</td>
            </tr>
            <tr>
              <td><code>modelConfig.device</code></td>
              <td>'webgpu' | 'wasm'</td>
              <td>❌</td>
              <td>Inference device (default: 'webgpu')</td>
            </tr>
          </tbody>
        </table>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e8f4f8', borderRadius: '6px' }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>🌐 Automatic Configuration</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
            The hook automatically configures environment settings based on the current host.
            No manual <code>envConfig</code> required for standard setups.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="demo-header">
          <h2>🎮 Live Demo Concept</h2>
        </div>
        
        <div className="demo-content" style={{ 
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ 
            padding: '1rem', 
            background: '#2d3748', 
            color: '#e2e8f0',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <strong>💡 Note:</strong> This demo requires WebGPU support and TTS model files.
            In a real implementation, you would hear synthesized speech here.
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              输入要合成的文本:
            </label>
            <textarea
              value={demoText}
              onChange={(e) => setDemoText(e.target.value)}
              placeholder="输入中文或英文文本..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            <select 
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                fontSize: '14px'
              }}
              disabled
            >
              <option>选择语音...</option>
              <option>zm_yunjian (中文)</option>
              <option>af_maple (英文)</option>
            </select>
            
            <button 
              className="btn"
              style={{ whiteSpace: 'nowrap' }}
              disabled
            >
              🚫 加载模型先
            </button>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px dashed #ddd',
            minHeight: '80px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#6c757d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div>
              <div>🔈 音频输出区域</div>
              <div style={{ fontSize: '11px', marginTop: '0.5rem' }}>
                (需要加载TTS模型后使用)
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
          <p className="text-muted">
            <strong>💡 Tip:</strong> This hook uses kokoro-js-zh with WebGPU acceleration. 
            Supports both Chinese and English speech synthesis with different voice profiles.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>📋 Return Value</h2>
        <table className="param-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>isLoading</code></td>
              <td>boolean</td>
              <td>True during model loading</td>
            </tr>
            <tr>
              <td><code>isReady</code></td>
              <td>boolean</td>
              <td>True when model is loaded and ready</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>string | null</td>
              <td>Error message if loading fails</td>
            </tr>
            <tr>
              <td><code>progress</code></td>
              <td>number</td>
              <td>Loading progress (0-100)</td>
            </tr>
            <tr>
              <td><code>load()</code></td>
              <td>function</td>
              <td>Loads the TTS model</td>
            </tr>
            <tr>
              <td><code>stream()</code></td>
              <td>function</td>
              <td>Creates a TTS streaming pipeline</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🎵 Supported Features</h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>Real-time audio streaming</li>
          <li>Multi-language support (中文/English)</li>
          <li>Multiple voice profiles</li>
          <li>WebGPU acceleration</li>
          <li>Progressive audio chunk delivery</li>
        </ul>
      </div>

      <div className="card">
        <h2>🤝 Integration with LLM</h2>
        <p>Combine TTS with LLM for real-time speech synthesis of generated text:</p>
        
        <pre>
          <code>{`// 实时LLM生成 + TTS语音合成
const { splitter, ttsPromise } = streamTTS(({ audio, text }) => {
  audioWorkletNode.port.postMessage(audio);
  if (text) {
    pendingRef.current.push(text);
    tryResolve();
  }
});

const llmPromise = generate(
  [{ role: "user", content: userMessage }],
  (token: string) => {
    previewTempText += token;
    setPreviewText(prev => prev + token);
  },
  splitter,
);

await Promise.all([llmPromise, ttsPromise]);`}</code>
        </pre>

        <p>支持智能分词处理：</p>
        
        <pre>
          <code>{`// 中英文智能分词
const tokens = i18n.language === 'zh-CN' 
  ? previewTempText.split(/[。]/g) 
  : previewTempText.match(/\\s*\\S+/g);

for (const token of tokens || []) {
  splitter.push(token + '\\n');
  await new Promise(resolve => setTimeout(resolve, 10));
}`}</code>
        </pre>
      </div>

      <div className="card">
        <h2>🔊 Available Voices</h2>
        <table className="param-table">
          <thead>
            <tr>
              <th>Voice ID</th>
              <th>Language</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>zm_yunjian</code></td>
              <td>中文</td>
              <td>中文语音合成</td>
            </tr>
            <tr>
              <td><code>af_maple</code></td>
              <td>English</td>
              <td>English voice synthesis</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TTSGuide;
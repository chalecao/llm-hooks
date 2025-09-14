import React, { useState } from 'react';

const LLMGuide = () => {
  const [demoInput, setDemoInput] = useState('Explain how transformers work in simple terms');

  return (
    <div>
      <div className="card">
        <h1 className="api-header">🧠 useLLM Hook</h1>
        <p>Run large language models directly in the browser using WebGPU for accelerated inference.</p>
      </div>

      <div className="card">
        <h2>🎯 Usage</h2>
        <pre>
          <code>{`import { useLLM } from 'llm-hooks';

function ChatComponent() {
  const { 
    isLoading, 
    isReady, 
    error, 
    progress, 
    load, 
    generate 
  } = useLLM({
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

  const handleGenerate = async () => {
    await load();
    
    // 基础用法：只生成文本
    await generate(
      [{ role: "user", content: "Hello!" }],
      (token) => console.log(token)
    );

    // 高级用法：与TTS协同工作
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

    await Promise.all([llmPromise, ttsPromise]);
  };

  if (!isReady) return <button onClick={load}>Load Model ({progress}%)</button>;
  return <button onClick={handleGenerate}>Generate Text</button>;
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
              <td><code>envConfig.remoteHost</code></td>
              <td>string</td>
              <td>✅</td>
              <td>Base URL for model files</td>
            </tr>
            <tr>
              <td><code>envConfig.remotePathTemplate</code></td>
              <td>string</td>
              <td>✅</td>
              <td>Path template for model files</td>
            </tr>
            <tr>
              <td><code>envConfig.wasmPaths</code></td>
              <td>string</td>
              <td>✅</td>
              <td>WASM library paths</td>
            </tr>
            <tr>
              <td><code>modelConfig.modelName</code></td>
              <td>string</td>
              <td>✅</td>
              <td>HuggingFace model identifier</td>
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
      </div>

      <div className="card">
        <div className="demo-header">
          <h2>🎮 Live Demo Concept</h2>
        </div>
        
        <div className="demo-content" style={{ 
          minHeight: '200px',
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
            <strong>💡 Note:</strong> This demo requires WebGPU support and model files.
            In a real implementation, you would see real-time token streaming here.
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
              placeholder="Enter your prompt..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
            <button 
              className="btn"
              style={{ whiteSpace: 'nowrap' }}
              disabled
            >
              🚫 Load Model First
            </button>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px dashed #ddd',
            minHeight: '100px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#6c757d'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>📊 Model Status:</div>
            <div>• WebGPU: {navigator.gpu ? '✅ Available' : '❌ Not Available'}</div>
            <div>• Model: ❌ Not Loaded</div>
            <div>• Progress: 0%</div>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
          <p className="text-muted">
            <strong>💡 Tip:</strong> This hook uses @huggingface/transformers with WebGPU acceleration. 
            Make sure to serve model files from a compatible endpoint.
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
              <td>Loads the model</td>
            </tr>
            <tr>
              <td><code>generate()</code></td>
              <td>function</td>
              <td>Generates text with the model</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🔑 Supported Models</h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>Gemma-3-270M-IT-ONNX</li>
          <li>Other ONNX-format HuggingFace models</li>
          <li>WebGPU-accelerated inference</li>
        </ul>
      </div>
    </div>
  );
};

export default LLMGuide;
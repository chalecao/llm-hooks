import React, { useState } from 'react';
import { useFetchStream } from '../../hooks/useFetchStream';

const FetchStreamGuide = () => {
  const [demoUrl, setDemoUrl] = useState('https://httpbin.org/stream/3');
  const { data, error, loading } = useFetchStream(demoUrl);

  const demoResponses = [
    'https://httpbin.org/stream/3',
    'https://httpbin.org/delay/1',
    'https://httpbin.org/bytes/128'
  ];

  return (
    <div>
      <div className="card">
        <h1 className="api-header">🌊 useFetchStream Hook</h1>
        <p>Handle streaming fetch requests with real-time data processing and error handling.</p>
      </div>

      <div className="card">
        <h2>🎯 Usage</h2>
        <pre>
          <code>{`import { useFetchStream } from 'llm-hooks';

function Example() {
  const { data, error, loading } = useFetchStream('https://api.example.com/stream');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
}`}</code>
        </pre>
      </div>

      <div className="card">
        <h2>⚙️ Parameters</h2>
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
              <td><code>url</code></td>
              <td>string</td>
              <td>✅</td>
              <td>The URL to fetch (supports streaming endpoints)</td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td>RequestInit</td>
              <td>❌</td>
              <td>Standard fetch options (headers, method, body, etc.)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="demo-header">
          <h2>🎮 Live Demo</h2>
          <div>
            <select 
              value={demoUrl} 
              onChange={(e) => setDemoUrl(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                minWidth: '200px',
                fontSize: '14px'
              }}
            >
              {demoResponses.map(url => (
                <option key={url} value={url}>
                  {url}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="demo-content" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
          {loading && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#3498db',
              height: '100px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
                <div>Streaming data...</div>
              </div>
            </div>
          )}
          
          {error && (
            <div style={{ color: '#e74c3c', padding: '1rem' }}>
              <strong>❌ Error:</strong> {error.message}
            </div>
          )}
          
          {data && !loading && (
            <div>
              <div style={{ 
                background: '#2d3748', 
                color: '#e2e8f0', 
                padding: '1rem', 
                borderRadius: '6px',
                marginBottom: '1rem',
                maxHeight: '200px',
                overflow: 'auto'
              }}>
                <pre style={{ margin: 0, fontSize: '12px' }}>{data}</pre>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#6c757d'
              }}>
                <span>✅ Stream completed</span>
                <span>{data.length} characters received</span>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
          <p className="text-muted">
            <strong>💡 Tip:</strong> This demo uses httpbin.org test endpoints. Try different endpoints to see how the hook handles various responses!
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
              <td><code>data</code></td>
              <td>string</td>
              <td>Streamed data content (accumulates as data arrives)</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>Error | null</td>
              <td>Error object if the request fails</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>boolean</td>
              <td>True while the request is in progress</td>
            </tr>
          </tbody>
        </table>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e8f4f8', borderRadius: '6px' }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>🔒 Features</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6c757d' }}>
            <li>Automatic request cancellation on component unmount</li>
            <li>Real-time streaming data processing</li>
            <li>Comprehensive error handling</li>
            <li>Loading state management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FetchStreamGuide;
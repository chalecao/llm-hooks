import React, { useState } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const TypingEffectGuide = () => {
  const [speed, setSpeed] = useState(50);
  const demoText = 'This is a live demo of useTypingEffect hook! Try adjusting the speed.';
  const animatedText = useTypingEffect(demoText, speed);

  return (
    <div>
      <div className="card">
        <h1 className="api-header">⌨️ useTypingEffect Hook</h1>
        <p>This hook simulates a realistic typing animation effect with customizable speed.</p>
      </div>

      <div className="card">
        <h2>🎯 Usage</h2>
        <pre>
          <code>{`import { useTypingEffect } from 'llm-hooks';

function Example() {
  const text = useTypingEffect('Hello world!', 50);
  return <div>{text}</div>;
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
              <td><code>text</code></td>
              <td>string</td>
              <td>✅</td>
              <td>The text to animate with typing effect</td>
            </tr>
            <tr>
              <td><code>speed</code></td>
              <td>number</td>
              <td>❌</td>
              <td>Typing speed in milliseconds (default: 50)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="demo-header">
          <h2>🎮 Live Demo</h2>
          <div>
            <label style={{ marginRight: '10px' }}>Speed: </label>
            <select 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white'
              }}
            >
              <option value={30}>Fast (30ms)</option>
              <option value={50}>Normal (50ms)</option>
              <option value={100}>Slow (100ms)</option>
              <option value={200}>Very Slow (200ms)</option>
            </select>
          </div>
        </div>
        
        <div className="demo-content" style={{ 
          fontFamily: 'monospace', 
          fontSize: '16px',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {animatedText}
          <span style={{ 
            animation: 'blink 1s infinite',
            marginLeft: '2px',
            color: '#3498db'
          }}>|</span>
        </div>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
          <p className="text-muted">
            <strong>💡 Tip:</strong> The cursor blinks to simulate real typing. Adjust the speed to see how it affects the animation!
          </p>
        </div>
      </div>

      <div className="card">
        <h2>📋 Return Value</h2>
        <p>Returns the currently displayed portion of the text as a string.</p>
        
        <pre>
          <code>{`// Returns: string
// Example: "Hello" -> "Hello world" -> "Hello world!"`}</code>
        </pre>
      </div>
    </div>
  );
};

export default TypingEffectGuide;
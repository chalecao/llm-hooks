import React from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/globals.css';

const Home = () => {
  const { t } = useTranslation();
  const welcomeText = useTypingEffect(t('welcome'), 30);
  
  return (
    <div>
      <div className="card">
        <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>{welcomeText}</h1>
        <p style={{ fontSize: '1.1rem', color: '#6c757d', lineHeight: '1.6' }}>
          {t('description')}
        </p>
      </div>

      <div className="card">
        <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
          🚀 Available Hooks
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <Link 
            to="/typing-effect" 
            className="btn"
            style={{ 
              display: 'block', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            ⌨️ {t('typingEffect')}
          </Link>
          
          <Link 
            to="/fetch-stream" 
            className="btn"
            style={{ 
              display: 'block', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            }}
          >
            🌊 {t('fetchStream')}
          </Link>
        </div>
      </div>

      <div className="card">
        <h3>📦 Installation</h3>
        <pre>
          <code>npm install llm-hooks</code>
        </pre>
        
        <h3 style={{ marginTop: '1.5rem' }}>✨ Usage</h3>
        <pre>
          <code>{`import { useTypingEffect, useFetchStream } from 'llm-hooks';

// Or import individually
import { useTypingEffect } from 'llm-hooks/useTypingEffect';
import { useFetchStream } from 'llm-hooks/useFetchStream';`}</code>
        </pre>
      </div>
    </div>
  );
};

export default Home;
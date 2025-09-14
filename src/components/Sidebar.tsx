import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: t('home'), icon: '🏠' },
    { path: '/typing-effect', label: t('typingEffect'), icon: '⌨️' },
    { path: '/fetch-stream', label: t('fetchStream'), icon: '🌊' },
    { path: '/llm', label: 'LLM', icon: '🧠' },
    { path: '/tts', label: 'TTS', icon: '🔊' }
  ];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px 0',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto'
    }}>
      <div style={{ 
        padding: '0 20px 20px', 
        borderBottom: '1px solid #34495e',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>🤖 llm-hooks</h2>
        <p style={{ 
          margin: '5px 0 0', 
          fontSize: '0.9rem', 
          color: '#bdc3c7',
          opacity: 0.8 
        }}>
          React Hooks Collection
        </p>
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              color: location.pathname === item.path ? '#3498db' : 'white',
              textDecoration: 'none',
              backgroundColor: location.pathname === item.path ? '#34495e' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #3498db' : '4px solid transparent',
              transition: 'all 0.3s ease',
              margin: '5px 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#34495e';
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ 
        padding: '20px', 
        marginTop: 'auto',
        borderTop: '1px solid #34495e',
        fontSize: '0.8rem',
        color: '#95a5a6'
      }}>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          padding: '8px 16px',
          border: i18n.language === 'en' ? '2px solid #3498db' : '1px solid #ddd',
          background: i18n.language === 'en' ? '#3498db' : 'white',
          color: i18n.language === 'en' ? 'white' : '#333',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: i18n.language === 'en' ? '600' : '400',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (i18n.language !== 'en') {
            e.currentTarget.style.background = '#f8f9fa';
            e.currentTarget.style.borderColor = '#3498db';
          }
        }}
        onMouseLeave={(e) => {
          if (i18n.language !== 'en') {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#ddd';
          }
        }}
      >
        🇺🇸 English
      </button>
      
      <button
        onClick={() => changeLanguage('zh')}
        style={{
          padding: '8px 16px',
          border: i18n.language === 'zh' ? '2px solid #3498db' : '1px solid #ddd',
          background: i18n.language === 'zh' ? '#3498db' : 'white',
          color: i18n.language === 'zh' ? 'white' : '#333',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: i18n.language === 'zh' ? '600' : '400',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (i18n.language !== 'zh') {
            e.currentTarget.style.background = '#f8f9fa';
            e.currentTarget.style.borderColor = '#3498db';
          }
        }}
        onMouseLeave={(e) => {
          if (i18n.language !== 'zh') {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#ddd';
          }
        }}
      >
        🇨🇳 中文
      </button>
    </div>
  );
};
import React from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <Sidebar />
      
      <div style={{
        flex: 1,
        marginLeft: '250px',
        minHeight: '100vh'
      }}>
        <header style={{
          backgroundColor: 'white',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <LanguageSwitcher />
        </header>
        
        <main style={{
          padding: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
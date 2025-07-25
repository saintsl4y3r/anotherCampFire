import { useState } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'

  const renderLogin = () => (
    <div className="auth-card">
      <h2>🔐 Đăng nhập CampFire</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      <button>Đăng nhập</button>
      <p className="link" onClick={() => setView('forgot')}>
        Quên mật khẩu?
      </p>
      <p>
        Chưa có tài khoản?{' '}
        <span className="link" onClick={() => setView('register')}>Đăng ký</span>
      </p>
    </div>
  );

  const renderRegister = () => (
    <div className="auth-card">
      <h2>📝 Đăng ký tài khoản</h2>
      <input type="text" placeholder="Họ và tên" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      <button>Đăng ký</button>
      <p>
        Đã có tài khoản?{' '}
        <span className="link" onClick={() => setView('login')}>Đăng nhập</span>
      </p>
    </div>
  );

  const renderForgot = () => (
    <div className="auth-card">
      <h2>🔁 Quên mật khẩu</h2>
      <input type="email" placeholder="Nhập email của bạn" />
      <button>Gửi lại mật khẩu</button>
      <p>
        <span className="link" onClick={() => setView('login')}>← Quay lại đăng nhập</span>
      </p>
    </div>
  );

  return (
    <div className="app-container">
      <h1 className="title">CampFire 🏕️</h1>
      {view === 'login' && renderLogin()}
      {view === 'register' && renderRegister()}
      {view === 'forgot' && renderForgot()}
    </div>
  );
}

export default App;

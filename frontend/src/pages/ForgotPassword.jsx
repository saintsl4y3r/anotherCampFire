import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang

    console.log('Submit clicked with email:', email);

    if (!email) {
      setMessage('❗ Vui lòng nhập email hợp lệ!');
      return;
    }

    // Giả lập gửi email
    setMessage(`🔐 Nếu email tồn tại, liên kết đặt lại mật khẩu sẽ được gửi đến: ${email}`);

    // TODO: Gọi API backend nếu cần
    // await fetch('/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
  };

  return (
    <div className="auth-card" style={{ maxWidth: '400px', margin: 'auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>📧 Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email đã đăng ký"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
          Gửi yêu cầu đặt lại mật khẩu
        </button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}

      <p style={{ marginTop: '1rem' }}>
        Quay lại <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

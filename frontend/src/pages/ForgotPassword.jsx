import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Vui lòng nhập email hợp lệ!');
      return;
    }

    // Tạm thời hiển thị thông báo giả lập
    setMessage(`🔐 Nếu email tồn tại, liên kết đặt lại mật khẩu sẽ được gửi đến: ${email}`);

    // Sau này có thể kết nối API backend xử lý quên mật khẩu
    // await fetch('/forgot-password', { ... });
  };

  return (
    <div className="auth-card">
      <h2>📧 Quên mật khẩu</h2>
      <input
        type="email"
        placeholder="Nhập email đã đăng ký"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Gửi yêu cầu đặt lại mật khẩu</button>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}

      <p style={{ marginTop: '1rem' }}>
        Quay lại <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

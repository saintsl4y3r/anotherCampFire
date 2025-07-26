import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

function Login({ onLogin, switchView }) {
  return (
    <div className="auth-card">
      <h2>🔐 Đăng nhập CampFire</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      <button onClick={onLogin}>Đăng nhập</button>
      <p className="link" onClick={() => switchView("forgot")}>
        Quên mật khẩu?
      </p>
      <p>
        Chưa có tài khoản?{" "}
        <span className="link" onClick={() => switchView("register")}>
          Đăng ký
        </span>
      </p>
    </div>
  );
}

function Register({ switchView }) {
  return (
    <div className="auth-card">
      <h2>📝 Đăng ký tài khoản</h2>
      <input type="text" placeholder="Họ và tên" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      <button>Đăng ký</button>
      <p>
        Đã có tài khoản?{" "}
        <span className="link" onClick={() => switchView("login")}>
          Đăng nhập
        </span>
      </p>
    </div>
  );
}

function Forgot({ switchView }) {
  return (
    <div className="auth-card">
      <h2>🔁 Quên mật khẩu</h2>
      <input type="email" placeholder="Nhập email của bạn" />
      <button>Gửi lại mật khẩu</button>
      <p>
        <span className="link" onClick={() => switchView("login")}>
          ← Quay lại đăng nhập
        </span>
      </p>
    </div>
  );
}

import Categories  from "./components/Categories";
import Category    from "./components/Category";
import Products    from "./components/Products";
import Product     from "./components/Product";
import Manufacturers from "./components/Manufacturers";
import Manufacturer  from "./components/Manufacturer";
import Details      from "./components/Details";
import Detail       from "./components/Detail";
import Orders       from "./components/Orders";
import Order        from "./components/Order";
import Reviews      from "./components/Reviews";
import Review       from "./components/Review";
import NoPage       from "./pages/NoPage";

function App() {
  const [view, setView] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => setLoggedIn(true);

  if (!loggedIn) {
    return (
      <div className="app-container">
        <h1 className="title">CampFire 🏕️</h1>
        {view === "login" && <Login onLogin={handleLogin} switchView={setView} />}
        {view === "register" && <Register switchView={setView} />}
        {view === "forgot" && <Forgot switchView={setView} />}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/categories">Categories</Link> |{" "}
        <Link to="/products">Products</Link> |{" "}
        <Link to="/manufacturers">Manufacturers</Link> |{" "}
        <Link to="/details">Details</Link> |{" "}
        <Link to="/orders">Orders</Link> |{" "}
        <Link to="/reviews">Reviews</Link>
      </nav>

      <Routes>
        <Route path="/"               element={<Categories />} />
        <Route path="/categories"     element={<Categories />} />
        <Route path="/category/:id"   element={<Category />} />

        <Route path="/products"       element={<Products />} />
        <Route path="/product/:id"    element={<Product />} />

        <Route path="/manufacturers"      element={<Manufacturers />} />
        <Route path="/manufacturer/:id"   element={<Manufacturer />} />

        <Route path="/details"       element={<Details />} />
        <Route path="/detail/:id"    element={<Detail />} />

        <Route path="/orders"        element={<Orders />} />
        <Route path="/order/:id"     element={<Order />} />

        <Route path="/reviews"       element={<Reviews />} />
        <Route path="/review/:id"    element={<Review />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

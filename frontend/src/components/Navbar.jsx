import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar poppins">
      <div className="logo">
        <span className="logo-bold">Store</span>Manager
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/add-stock">Add Stock</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>

        <li>
          <Link to="/bill-history">Bill History</Link>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>
        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

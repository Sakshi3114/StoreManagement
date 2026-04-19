import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-6 hidden md:block poppins">
      <h1 className="text-2xl font-bold mb-10">
        <span className="text-red-600">Store</span>Manager
      </h1>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-red-600 font-medium">
          Dashboard
        </Link>

        <Link
          to="/add-product"
          className="block hover:text-red-600 font-medium"
        >
          Add Product
        </Link>

        <Link to="/add-stock" className="block hover:text-red-600 font-medium">
          Add Stock
        </Link>

        <Link to="/inventory" className="block hover:text-red-600 font-medium">
          Inventory
        </Link>

        <Link to="/billing" className="block hover:text-red-600 font-medium">
          Billing
        </Link>

        <Link
          to="/bill-history"
          className="block hover:text-red-600 font-medium"
        >
          Bill-History
        </Link>

        <Link to="/reports" className="block hover:text-red-600 font-medium">
          Reports
        </Link>

        <button
          onClick={logout}
          className="mt-10 text-left text-red-600 font-semibold"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

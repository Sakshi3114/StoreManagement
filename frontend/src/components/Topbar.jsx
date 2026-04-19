const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center rounded-xl poppins">
      <div>
        <h2 className="text-xl font-bold">Welcome back 👋</h2>
        <p className="text-gray-500 text-sm">
          {user?.businessName || "Your Store"}
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
        {user?.businessName?.charAt(0) || "S"}
      </div>
    </div>
  );
};

export default Topbar;

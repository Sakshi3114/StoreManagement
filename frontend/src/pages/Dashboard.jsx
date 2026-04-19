import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    todaySales: 0,
    lowStock: 0,
    monthlyProfit: 0,
  });

  const [recentBills, setRecentBills] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, inventoryRes, billsRes] = await Promise.all([
        API.get("/products"),
        API.get("/inventory"),
        API.get("/bills"),
      ]);

      const products = productsRes.data || [];

      const inventory = inventoryRes.data || [];

      const bills = billsRes.data || [];

      /* Total Products */
      const totalProducts = products.length;

      /* Today's Sales */
      const today = new Date().toISOString().split("T")[0];

      const todayBills = bills.filter(
        (bill) => bill.createdAt?.split("T")[0] === today
      );

      const todaySales = todayBills.reduce(
        (sum, bill) => sum + Number(bill.grandTotal || 0),
        0
      );

      /* Low Stock */
      const lowStock = inventory.filter(
        (item) => item.totalStock < 20 && item.totalStock > 0
      ).length;

      /* Monthly Profit */
      const currentMonth = new Date().getMonth();

      const currentYear = new Date().getFullYear();

      const monthlyBills = bills.filter((bill) => {
        const d = new Date(bill.createdAt);

        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      let monthlyRevenue = monthlyBills.reduce(
        (sum, bill) => sum + Number(bill.grandTotal || 0),
        0
      );

      /* Approx Profit (20%) */
      const monthlyProfit = Math.round(monthlyRevenue * 0.2);

      setStats({
        totalProducts,
        todaySales,
        lowStock,
        monthlyProfit,
      });

      setRecentBills(bills.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <Topbar />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            color="text-blue-600"
          />

          <StatCard
            title="Today's Sales"
            value={`₹${stats.todaySales}`}
            color="text-green-600"
          />

          <StatCard
            title="Low Stock"
            value={stats.lowStock}
            color="text-yellow-600"
          />

          <StatCard
            title="Profit This Month"
            value={`₹${stats.monthlyProfit}`}
            color="text-red-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700">
              Add Product
            </button>

            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700">
              Billing
            </button>

            <button className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700">
              Reports
            </button>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Recent Bills</h2>

          <div className="space-y-4">
            {recentBills.map((bill) => (
              <div
                key={bill._id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold">{bill.billNumber}</p>

                  <p className="text-sm text-gray-500">{bill.customerName}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600">₹{bill.grandTotal}</p>

                  <p className="text-sm text-gray-500">{bill.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

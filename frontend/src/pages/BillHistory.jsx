import { useEffect, useState } from "react";
import API from "../services/api";
import BillModal from "../components/BillModal";
import Navbar from "../components/Navbar";

const BillHistory = () => {
  const [bills, setBills] = useState([]);

  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const res = await API.get("/bills");

    setBills(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 poppins">
          <h1 className="text-3xl font-bold mb-6">Bill History</h1>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Bill No</th>

                  <th className="p-4">Date</th>

                  <th className="p-4">Customer</th>

                  <th className="p-4">Items</th>

                  <th className="p-4">Payment</th>

                  <th className="p-4">Total</th>

                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((bill) => (
                  <tr key={bill._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{bill.billNumber}</td>

                    <td className="p-4">
                      {new Date(bill.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">{bill.customerName}</td>

                    <td className="p-4">{bill.items.length}</td>

                    <td className="p-4">{bill.paymentMethod}</td>

                    <td className="p-4 font-bold">₹{bill.grandTotal}</td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedBill && (
          <BillModal
            bill={selectedBill}
            onClose={() => setSelectedBill(null)}
          />
        )}
      </div>
    </>
  );
};

export default BillHistory;

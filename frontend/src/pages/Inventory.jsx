import { useEffect, useState } from "react";
import API from "../services/api";
import ProductModal from "../components/ProductModal";
import Navbar from "../components/Navbar";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const openModal = async (product) => {
    setSelectedProduct(product);

    const res = await API.get(`/stock/${product._id}`);

    setBatches(res.data);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setBatches([]);
  };

  const fetchInventory = async () => {
    const res = await API.get("/inventory");
    setItems(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8 poppins">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Product</th>

                  <th className="p-4">SKU</th>

                  <th className="p-4">Category</th>

                  <th className="p-4">Total Stock</th>

                  <th className="p-4">Near Expiry</th>

                  <th className="p-4">Selling Price</th>

                  <th className="p-4">Status</th>

                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.name}</td>

                    <td className="p-4">{item.sku}</td>

                    <td className="p-4">{item.category}</td>

                    <td className="p-4">{item.totalStock}</td>

                    <td className="p-4 text-yellow-600 font-semibold">
                      {item.nearExpiry}
                    </td>

                    <td className="p-4">₹{item.sellingPrice}</td>

                    <td className="p-4">
                      {item.totalStock === 0 ? (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      ) : item.totalStock < 20 ? (
                        <span className="text-yellow-600 font-semibold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => openModal(item)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedProduct && (
              <ProductModal
                product={selectedProduct}
                batches={batches}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;

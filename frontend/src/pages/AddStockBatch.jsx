import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const AddStockBatch = () => {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    productId: "",
    batchNumber: "",
    quantityAdded: "",
    costPrice: "",
    supplier: "",
    mfgDate: "",
    expiryDate: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/stock", formData);

      setMessage("Stock Added Successfully");
    } catch (error) {
      setMessage("Failed to add stock");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8 ">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 poppins">
          <h1 className="text-3xl font-bold mb-6">Add Stock Batch</h1>

          {message && <p className="mb-4 text-green-600">{message}</p>}

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <select
              name="productId"
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            >
              <option value="">Select Product</option>

              {products.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.sku})
                </option>
              ))}
            </select>

            <input
              type="text"
              name="batchNumber"
              placeholder="Batch Number"
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              name="quantityAdded"
              placeholder="Quantity"
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              name="costPrice"
              placeholder="Cost Price"
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="supplier"
              placeholder="Supplier Name"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              name="mfgDate"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              name="expiryDate"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
            >
              Add Stock
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStockBatch;

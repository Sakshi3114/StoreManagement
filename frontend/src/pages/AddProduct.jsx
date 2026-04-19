import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    barcode: "",
    category: "",
    brand: "",
    sellingPrice: "",
    taxPercent: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("image", image);

      await API.post("/products", data);

      setMessage("Product Added Successfully");

      setFormData({
        sku: "",
        name: "",
        barcode: "",
        category: "",
        brand: "",
        sellingPrice: "",
        taxPercent: "",
      });
    } catch (error) {
      setMessage("Failed to add product");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8 ">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 poppins">
          <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

          {message && <p className="mb-4 text-green-600">{message}</p>}

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="sku"
              placeholder="SKU Code"
              value={formData.sku}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              name="sellingPrice"
              placeholder="Selling Price"
              value={formData.sellingPrice}
              onChange={handleChange}
              required
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              name="taxPercent"
              placeholder="Tax %"
              value={formData.taxPercent}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

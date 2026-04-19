import { useEffect, useState } from "react";
import API from "../services/api";

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");

    setProducts(res.data);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQty = (id, action) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          const newQty =
            action === "inc" ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: newQty < 1 ? 1 : newQty,
          };
        }

        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.sellingPrice,
    0
  );

  const tax = subtotal * 0.05;

  const grandTotal = subtotal + tax;

  const generateBill = async () => {
    if (loading) return;

    setLoading(true);
    const payload = {
      customerName: "Walk-in Customer",

      paymentMethod,

      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
        total: item.quantity * item.sellingPrice,
      })),

      subtotal,
      tax,
      grandTotal,
    };

    try {
      await API.post("/bills", payload);

      alert("Bill Generated Successfully");

      setCart([]);
    } catch (error) {
      alert("Billing Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 poppins">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-5">Billing Counter</h1>

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-3 rounded-xl mb-5"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl p-4 hover:shadow cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <h2 className="font-bold text-lg">{product.name}</h2>

                <p className="text-gray-500">{product.sku}</p>

                <p className="text-red-600 font-bold mt-2">
                  ₹{product.sellingPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-5">Cart</h2>

          <div className="space-y-4 max-h-100 overflow-y-auto">
            {cart.map((item) => (
              <div key={item._id} className="border rounded-xl p-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{item.name}</h3>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-600"
                  >
                    ✕
                  </button>
                </div>

                <p>₹{item.sellingPrice}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(item._id, "dec")}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQty(item._id, "inc")}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-3 rounded-xl mt-5"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
          </select>

          <button
            disabled={loading}
            onClick={generateBill}
            className="w-full bg-red-600 text-white py-3 rounded-xl mt-5 hover:bg-red-700"
          >
            {loading ? "Generating..." : "Generate Bill"}
          </button>

          <button
            onClick={() => setCart([])}
            className="w-full bg-gray-200 py-3 rounded-xl mt-3"
          >
            Cancel Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;

const ProductModal = ({ product, batches, onClose }) => {
  const today = new Date();

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 poppins">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 relative">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        <p className="text-gray-500 mb-6">SKU: {product.sku}</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Batch</th>
                <th className="p-3">Qty Left</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Expiry</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {batches.map((batch) => {
                const exp = new Date(batch.expiryDate);

                const diff = (exp - today) / (1000 * 60 * 60 * 24);

                let status = "Healthy";

                let color = "text-green-600";

                if (diff < 0) {
                  status = "Expired";
                  color = "text-red-600";
                } else if (diff < 30) {
                  status = "Expiring Soon";
                  color = "text-yellow-600";
                }

                return (
                  <tr key={batch._id} className="border-b">
                    <td className="p-3">{batch.batchNumber}</td>

                    <td className="p-3">{batch.quantityRemaining}</td>

                    <td className="p-3">₹{batch.costPrice}</td>

                    <td className="p-3">
                      {new Date(batch.expiryDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{batch.supplier}</td>

                    <td className={`p-3 font-semibold ${color}`}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

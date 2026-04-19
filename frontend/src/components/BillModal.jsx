const BillModal = ({ bill, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 poppins">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-2">Invoice</h1>

        <p className="text-gray-500 mb-6">{bill.billNumber}</p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <strong>Customer:</strong> {bill.customerName}
          </div>

          <div>
            <strong>Payment:</strong> {bill.paymentMethod}
          </div>

          <div>
            <strong>Date:</strong> {new Date(bill.createdAt).toLocaleString()}
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Item</th>

              <th className="p-3">Qty</th>

              <th className="p-3">Price</th>

              <th className="p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {bill.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{item.name}</td>

                <td className="p-3">{item.quantity}</td>

                <td className="p-3">₹{item.sellingPrice}</td>

                <td className="p-3">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-2 text-right">
          <p>Subtotal: ₹{bill.subtotal}</p>

          <p>Tax: ₹{bill.tax}</p>

          <p className="text-xl font-bold">Total: ₹{bill.grandTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default BillModal;

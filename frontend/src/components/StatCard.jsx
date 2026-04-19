const StatCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 poppins">
      <p className="text-gray-500 text-sm mb-2">{title}</p>

      <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
    </div>
  );
};

export default StatCard;

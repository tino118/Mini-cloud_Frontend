export default function InfraDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Infrastructure Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Serveurs Actifs</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Utilisation CPU</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">24%</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Alertes</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">0</p>
        </div>
      </div>
    </div>
  );
}

export default function InfraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Mini Cloud Infra</h2>
        <nav className="space-y-2">
          <a href="/infra/dashboard" className="block p-2 hover:bg-gray-100 rounded">Tableau de bord</a>
          <a href="/infra/servers" className="block p-2 hover:bg-gray-100 rounded">Serveurs</a>
          <a href="/infra/monitoring" className="block p-2 hover:bg-gray-100 rounded">Monitoring</a>
          <a href="/infra/settings" className="block p-2 hover:bg-gray-100 rounded">Paramètres</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

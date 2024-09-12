import ClientRow from "./Client";

const clients = [
  {
    id: 1,
    name: "jey lopez",
    email: "lopezgalvisjeanmary@gmail.com",
    phone: "+56999999999",
    state: "active",
    details: ""
  },
  {
    id: 2,
    name: "Roberto mendoza",
    email: "robertoemendozac@gmail.com",
    phone: "+56988888888",
    state: "free",
    details: ""
  },
  {
    id: 3,
    name: "jonmathan pantaleon",
    email: "panthalo@gmail.com",
    phone: "+56977777777",
    state: "lock",
    details: ""
  }
];

export const ClientTable = () => {
  return (
    <section className="antialiased text-gray-600 h-full px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Clientes</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Nombre</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left"># telefono</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Estado</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Detalle</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {clients.map(client => (
                    <ClientRow {...client} key={client.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

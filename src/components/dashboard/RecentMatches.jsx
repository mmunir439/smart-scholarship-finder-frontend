export function RecentMatches() {
  const data = [
    { name: "Fulbright", country: "USA", status: "Eligible", deadline: "May 15, 2026" },
    { name: "DAAD", country: "Germany", status: "Eligible", deadline: "Oct 31, 2026" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl w-full">
      <h3 className="mb-4 font-semibold">Recent Matches</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 text-left">
          <tr>
            <th className="pb-2">Name</th>
            <th className="pb-2">Country</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Deadline</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.name} className="border-t">
              <td className="py-2">{item.name}</td>
              <td>{item.country}</td>
              <td>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  {item.status}
                </span>
              </td>
              <td>{item.deadline}</td>
              <td className="text-gold cursor-pointer hover:underline">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function SavedHistory({ trips, loading, error, onRefresh }) {
  function formatDate(isoString) {
    if (!isoString) return '-'
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Saved History</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center py-4">{error}</p>
      )}

      {!error && loading && (
        <p className="text-slate-400 text-center py-8">Loading...</p>
      )}

      {!error && !loading && (!trips || trips.length === 0) && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-400">No saved trips yet.</p>
          <p className="text-slate-400 text-sm mt-1">
            Fill in the calculator above and click <strong>Save Trip</strong>.
          </p>
        </div>
      )}

      {!error && !loading && trips && trips.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cost (USD)</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cost (Local)</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sell Price</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Margin</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-800">
                    ${Number(trip.totalCostUsd || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-800">
                    {Number(trip.totalCostLocal || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                    {Number(trip.suggestedSellingPrice || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {trip.margin || 0}%
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {formatDate(trip.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

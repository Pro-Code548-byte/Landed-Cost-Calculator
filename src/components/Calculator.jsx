import { useState } from 'react'

export default function Calculator({ onSaveTrip }) {
  const [form, setForm] = useState({
    productCost: '',
    travelExpenses: '',
    shippingCost: '',
    exchangeRate: '',
    margin: '20',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const p = parseFloat(form.productCost) || 0
  const t = parseFloat(form.travelExpenses) || 0
  const s = parseFloat(form.shippingCost) || 0
  const rate = parseFloat(form.exchangeRate) || 0
  const margin = parseFloat(form.margin) || 0

  const totalUsd = p + t + s
  const totalLocal = totalUsd * rate
  const suggested = totalLocal * (1 + margin / 100)

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setSaved(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await onSaveTrip({
        productCost: p,
        travelExpenses: t,
        shippingCost: s,
        exchangeRate: rate,
        margin,
        totalCostUsd: totalUsd,
        totalCostLocal: totalLocal,
        suggestedSellingPrice: suggested,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      alert('Failed to save trip: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 fade-in">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">Calculate Your Landed Cost</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Product Cost (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="0.00"
            value={form.productCost}
            onChange={handleChange('productCost')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Travel Expenses (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="0.00"
            value={form.travelExpenses}
            onChange={handleChange('travelExpenses')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Shipping Cost (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="0.00"
            value={form.shippingCost}
            onChange={handleChange('shippingCost')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Exchange Rate (1 USD = ?)</label>
          <input
            type="number"
            min="0.0001"
            step="0.01"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="e.g. 1500"
            value={form.exchangeRate}
            onChange={handleChange('exchangeRate')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Desired Margin (%)</label>
          <input
            type="number"
            min="0"
            max="1000"
            step="0.5"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            value={form.margin}
            onChange={handleChange('margin')}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
        <h3 className="text-sm font-semibold text-indigo-700 mb-3">Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-indigo-500">Total Cost (USD)</p>
            <p className="text-lg font-bold text-slate-800">${totalUsd.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-500">Total Cost (Local)</p>
            <p className="text-lg font-bold text-slate-800">{totalLocal.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-indigo-500">Suggested Selling Price</p>
            <p className="text-lg font-bold text-emerald-600">{suggested.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || totalUsd === 0}
        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Trip'}
      </button>
    </div>
  )
}

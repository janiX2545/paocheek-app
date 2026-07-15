import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import { Copy, Check } from 'lucide-react'
import FriendTag from './FriendTag'

export default function ReceiptSlip({ bill, selectedFriend, onClose }) {
  const [copiedField, setCopiedField] = useState(null)
  const [paymentStatuses, setPaymentStatuses] = useState({})

  const calculateTotals = () => {
    const totals = {}
    bill.friends.forEach(friend => {
      totals[friend] = 0
    })

    bill.items.forEach(item => {
      const perPerson = item.price / item.sharedBy.length
      item.sharedBy.forEach(friend => {
        totals[friend] = (totals[friend] || 0) + perPerson
      })
    })

    return totals
  }

  const totals = calculateTotals()
  const colors = ['bg-pastel-pink', 'bg-pastel-blue', 'bg-pastel-yellow', 'bg-pastel-green', 'bg-pastel-purple', 'bg-pastel-peach']

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const togglePaymentStatus = (friend) => {
    setPaymentStatuses(prev => ({
      ...prev,
      [friend]: !prev[friend]
    }))
  }

  const billTotal = Object.values(totals).reduce((a, b) => a + b, 0)
  const friendAmount = selectedFriend ? totals[selectedFriend] : billTotal

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Receipt Header */}
        <div className="bg-gradient-to-r from-pastel-pink to-pastel-purple p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">🧾 {bill.name}</h2>
          <p className="text-sm opacity-90">Receipt Summary</p>
        </div>

        {/* Receipt Body */}
        <div className="p-6">
          {/* Items List */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">📝 Items</h3>
            <div className="bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-lg p-4 space-y-2">
              {bill.items.map(item => (
                <div key={item.id} className="flex justify-between items-start bg-white/70 p-2 rounded">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {item.sharedBy.map((friend, i) => (
                        <FriendTag key={friend} name={friend} color={colors[i % colors.length]} />
                      ))}
                    </div>
                  </div>
                  <p className="font-bold text-pastel-pink">฿{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          {!selectedFriend ? (
            <>
              {/* Total */}
              <div className="mb-6 bg-gradient-to-r from-pastel-mint to-pastel-blue rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-800">💰 Total Bill</span>
                  <span className="text-3xl font-bold text-pastel-pink">฿{billTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Everyone's breakdown */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">👥 Who Pays What</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {bill.friends.map((friend, idx) => (
                    <div
                      key={friend}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                        paymentStatuses[friend]
                          ? 'bg-pastel-green border-green-400'
                          : 'bg-white border-gray-200 hover:border-pastel-pink'
                      }`}
                      onClick={() => onClose && togglePaymentStatus(friend)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">👤 {friend}</span>
                        <span className={`text-lg font-bold ${paymentStatuses[friend] ? 'text-green-600' : 'text-pastel-pink'}`}>
                          ฿{totals[friend].toFixed(2)}
                        </span>
                      </div>
                      {paymentStatuses[friend] && (
                        <p className="text-xs text-green-600 mt-1">✅ Paid</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Selected Friend Payment Details */}
              <div className="mb-6 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">👤 {selectedFriend}</h3>
                <p className="text-4xl font-bold mb-4">฿{friendAmount.toFixed(2)}</p>
                <button
                  onClick={() => togglePaymentStatus(selectedFriend)}
                  className={`w-full py-2 rounded-lg font-bold transition ${
                    paymentStatuses[selectedFriend]
                      ? 'bg-green-400 text-white'
                      : 'bg-white text-pastel-pink hover:bg-gray-100'
                  }`}
                >
                  {paymentStatuses[selectedFriend] ? '✅ Paid' : '💳 Mark as Paid'}
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">💸 Payment Options</h3>

                {/* PromptPay */}
                <div className="mb-4 border-2 border-pastel-blue rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">📱 PromptPay QR Code</h4>
                  <div className="bg-white p-4 rounded-lg flex justify-center mb-3">
                    <QRCode
                      value={`00020126360014com.promptpay0061003652317065115040540061005802TH530376434079000863060406${friendAmount.toFixed(2)}6304XXXX`}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-center text-gray-600">Amount: ฿{friendAmount.toFixed(2)}</p>
                </div>

                {/* Bank Transfer */}
                <div className="border-2 border-pastel-green rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">🏦 Bank Transfer</h4>
                  <div className="space-y-3">
                    <div className="bg-pastel-yellow rounded-lg p-3">
                      <label className="text-xs text-gray-600 font-semibold">Account Number</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          value="0123456789"
                          readOnly
                          className="flex-1 bg-white px-3 py-2 rounded border-0 text-gray-800 font-mono text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard('0123456789', 'account')}
                          className="bg-pastel-pink text-white p-2 rounded hover:bg-pastel-purple transition"
                        >
                          {copiedField === 'account' ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-pastel-peach rounded-lg p-3">
                      <label className="text-xs text-gray-600 font-semibold">Bank</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          value="Kasikornbank (KBANK)"
                          readOnly
                          className="flex-1 bg-white px-3 py-2 rounded border-0 text-gray-800 text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard('Kasikornbank (KBANK)', 'bank')}
                          className="bg-pastel-pink text-white p-2 rounded hover:bg-pastel-purple transition"
                        >
                          {copiedField === 'bank' ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-pastel-mint rounded-lg p-3">
                      <label className="text-xs text-gray-600 font-semibold">Account Name</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          value="John Doe"
                          readOnly
                          className="flex-1 bg-white px-3 py-2 rounded border-0 text-gray-800 text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard('John Doe', 'name')}
                          className="bg-pastel-pink text-white p-2 rounded hover:bg-pastel-purple transition"
                        >
                          {copiedField === 'name' ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What they're paying for */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">🍽️ Items {selectedFriend} is sharing:</h3>
                <div className="space-y-2">
                  {bill.items.filter(item => item.sharedBy.includes(selectedFriend)).map(item => (
                    <div key={item.id} className="bg-pastel-yellow rounded-lg p-3 flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <span className="text-pastel-pink font-bold">฿{(item.price / item.sharedBy.length).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}

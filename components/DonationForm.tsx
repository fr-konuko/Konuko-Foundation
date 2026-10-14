'use client'

import { useState } from 'react'

const amounts = [500, 1000, 2500, 5000, 10000]

export function DonationForm({ donationNote }: { donationNote?: string }) {
  const [amount, setAmount] = useState(1000)

  return (
    <div className="donation-box">
      <h2>Choose Your Impact</h2>
      <p>One-time or monthly donation</p>
      <div className="amounts">
        {amounts.map((option) => (
          <button
            key={option}
            type="button"
            className={amount === option ? 'active' : ''}
            aria-pressed={amount === option}
            onClick={() => setAmount(option)}
          >
            KSh {option.toLocaleString()}
          </button>
        ))}
      </div>
      <div className="impact-note">
        KSh {amount.toLocaleString()} can support learning materials, training or program activities.
      </div>
      {donationNote && <p>{donationNote}</p>}
      <label>Your Name<input name="name" placeholder="Full Name" /></label>
      <label>Email<input name="email" type="email" placeholder="Email Address" /></label>
      <label>Phone Number<input name="phone" placeholder="+254 7XX XXX XXX" /></label>
      <button className="btn btn-primary full" type="button">
        Donate KSh {amount.toLocaleString()} →
      </button>
      <p className="small">Payment integration is not connected yet.</p>
      <div className="payment-pills"><span>M-Pesa</span><span>Card</span><span>Bank Transfer</span></div>
    </div>
  )
}

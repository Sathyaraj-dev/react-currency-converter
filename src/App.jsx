import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currencies, setCurrencies] = useState({})
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [result, setResult] = useState(null)
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await fetch(`https://api.frankfurter.dev/v1/latest`)
      const data = await response.json()
      setCurrencies({ [data.base]: 1, ...data.rates })
    }

    getCurrencies()
  }, [])

  const handleConvert = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log(data)

      const rate = data.rates[to]
      if (!rate) {
        throw new Error('Conversion rate not found')
      }

      setResult(rate * amount)
    } catch (error) {
      console.error(error)
      setResult(`Error: ${error.message}`)
    }
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <div className="currency-container">
        <div className="currency-selector">
          <label htmlFor="from">From:</label>
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(currencies).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        <div className="currency-selector">
          <label htmlFor="to">To:</label>
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(currencies).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          id="amount"
        />
      </div>

      <button onClick={handleConvert}>Convert</button>

      {result !== null && (
        <div className="result">
          <p>
            {amount} {from} = {result.toFixed(2)} {to}
          </p>
        </div>
      )}
    </>
  )
}

export default App

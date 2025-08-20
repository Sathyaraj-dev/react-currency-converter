import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = 'd738c009661fb1ebb3b5f070d8048f92'

function App() {
  const [currencies, setCurrencies] = useState({})
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [result, setResult] = useState(null)
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await fetch(`https://api.currencylayer.com/list?access_key=${API_KEY}`)
      const data = await response.json()
      console.log(data)
      setCurrencies(data.currencies || {})
    }

    getCurrencies()
  }, [])

  const handleConvert = async () => {
    const response = await fetch(
      `https://api.currencylayer.com/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`
    )
    const data = await response.json()
    console.log(data)
    setResult(data.result)
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <div className='currency-container'>
      <div className='currency-selector'>
        <label htmlFor="from">From:</label>
        <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className='currency-selector'>
        <label htmlFor="to">To:</label>
        <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
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
          onChange={(e) => setAmount(e.target.value)}
          id="amount"
        />
      </div>
      <button onClick={handleConvert}>Convert</button>

      
        {result !== null && (
          <div className='result'>
            <p>
              {amount} {from} = {result} {to}
            </p>
          </div>
        )}
      
    </>
  )
}

export default App

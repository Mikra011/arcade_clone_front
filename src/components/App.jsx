import React, { useState, useEffect } from 'react';
import '../styles/App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/section')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) 
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Data from Backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App

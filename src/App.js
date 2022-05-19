import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryList from './assets/cc.json'

function App() {
  const [emergencyNumber, setEmergencyNumber] = useState()
  const [country, setCountry] = useState('')
  const [countryCode, setCountryCode] = useState()

  const handleChange = (e) => {
    setCountryCode(e.target.value)
    getEmergencyNumber()
  }

  const getGeoInfo = async () => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        setCountry(response.data.country_name)
        setCountryCode(response.data.country_code)
        getEmergencyNumber()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getEmergencyNumber = async () => {
    axios
      .get(`https://emergencynumberapi.com/api/country/${countryCode}`)
      .then((response) => {
        setEmergencyNumber(response.data.fixed)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getGeoInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <main className='h-screen w-screen'>
      <h1>Your number for 911 is</h1>
      <h2>{emergencyNumber}</h2>
      <label htmlFor='country'>Actually I live in...</label>
      <select name='country' id='country' onChange={handleChange}>
        <option disabled>one of these countries</option>
        {CountryList.map((country) => (
          <option key={country.alpha2} value={country.alpha2}>
            {country.name}
          </option>
        ))}
      </select>
      <footer>
        <p className='strong'>
          If you are in trouble just call 911, it will redirect to the local
          emergency services
        </p>
        <p>
          The data from this website is provided without any claims of accuracy,
          you should use this data as guidance, and do your own due diligence.
        </p>
        <p className='footer'>Made by Morgan Wilde with React</p>
        {/* Social links */}
      </footer>
      <div className='background'>{country}</div>
    </main>
  )
}

export default App

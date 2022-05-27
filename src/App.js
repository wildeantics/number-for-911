import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import EmergencyNumbers from './assets/EmergencyNumbers.json'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function App() {
  const [emergencyNumber, setEmergencyNumber] = useState()
  const [ambulance, setAmbulance] = useState(null)
  const [fire, setFire] = useState(null)
  const [police, setPolice] = useState(null)

  const handleChange = (e) => {
    let myCountry = EmergencyNumbers[e.target.value]
    handleEmergency(myCountry)
  }

  const getGeoInfo = async () => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        let myCountry = Object.values(EmergencyNumbers).find(
          (e) => e.Country.ISOCode === response.data.country_code
        )
        handleEmergency(myCountry)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEmergency = (myCountry) => {
    if (myCountry.Dispatch.All) {
      handleRest()
      setEmergencyNumber(myCountry.Dispatch.All)
    } else if (myCountry.Dispatch.Fixed) {
      handleRest()
      setEmergencyNumber(myCountry.Dispatch.Fixed)
    } else {
      setEmergencyNumber()
      setAmbulance(myCountry.Ambulance.All)
      setFire(myCountry.Fire.All)
      setPolice(myCountry.Police.All)
    }
  }

  const handleRest = () => {
    setAmbulance()
    setFire()
    setPolice()
    setEmergencyNumber()
  }

  useEffect(() => {
    getGeoInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={1} style={{ textAlign: 'center' }}>
        <Typography
          variant='h2'
          gutterBottom
          style={{ textTransform: 'uppercase' }}
        >
          Your number for 911 is
        </Typography>
        <Typography variant='h1' gutterBottom>
          <a href={`tel:${emergencyNumber}`}>{emergencyNumber}</a>
          {!emergencyNumber &&
            !ambulance &&
            !fire &&
            !police &&
            "There's no emergency number listed here, sorry!"}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4}>
            {ambulance && (
              <Card>
                <CardContent sx={{ height: '180px' }}>
                  <Typography variant='h5'>
                    Ambulance <LocalHospitalIcon />
                  </Typography>
                  <Typography variant='h1'>
                    <a href={`tel:${ambulance}`}>{ambulance}</a>
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            {fire && (
              <Card>
                <CardContent sx={{ height: '180px' }}>
                  <Typography variant='h5' gutterBottom>
                    Fire <LocalFireDepartmentIcon />
                  </Typography>
                  <Typography variant='h1'>
                    <a href={`tel:${fire}`}>{fire}</a>
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            {police && (
              <Card>
                <CardContent sx={{ height: '180px' }}>
                  <Typography variant='h5' gutterBottom>
                    Police <LocalPoliceIcon />
                  </Typography>
                  <Typography variant='h1'>
                    <a href={`tel:${police}`}>{police}</a>
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
        <FormControl variant='standard' sx={{ mt: 3, minWidth: 320 }}>
          <InputLabel id='country'>Actually I live in...</InputLabel>
          <Select
            labelId='country'
            id='country-select'
            onChange={handleChange}
            defaultValue={'default'}
          >
            <MenuItem disabled value={'default'}>
              one of these countries
            </MenuItem>
            {EmergencyNumbers.map((country, i) => (
              <MenuItem key={country.Country.ISOCode} value={i}>
                {country.Country.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1} sx={{ mt: 10 }} style={{ textAlign: 'center' }}>
        <footer>
          <Typography variant='caption' display='block' gutterBottom>
            <p className='strong'>
              If you are in trouble just call 911, it will redirect to the local
              emergency services
            </p>
            <p>
              The data from this website is provided without any claims of
              accuracy, you should use this data as guidance, and do your own
              due diligence.
            </p>
            <p className='footer'>Made by Morgan Wilde with React</p>
            <a href='https://github.com/wildeantics'>
              <GitHubIcon />
            </a>
            <a href='https://www.linkedin.com/in/morganwilde/'>
              <LinkedInIcon />
            </a>
          </Typography>
        </footer>
      </Grid>
    </Grid>
  )
}

export default App

import './App.css'
import Search from './components/Search'
import Main from './components/Main'
import Forecast from './components/Forecast'
import { useEffect, useState, useCallback, useReducer } from 'react'
import weatherReducer, { initialState } from './reducers/weatherReducer'
import { ReactComponent as Svg } from './assets/loading.svg'

function App () {
  const [weatherState, dispatch] = useReducer(weatherReducer, initialState)

  const fetchWeatherData = async (API_ENDPOINT_CURR, API_ENDPOINT_FORC) => {
    try {
      dispatch({ type: 'WEATHER_FETCH_INIT' })
      const response1 = await fetch(API_ENDPOINT_CURR)
      const response2 = await fetch(API_ENDPOINT_FORC)
      const curr = await response1.json()
      const forecast = await response2.json()
      if (curr.cod != '404') {
        dispatch({
          type: 'WEATHER_FETCH_SUCCESS',
          payload: { current: curr, forecast: forecast }
        })
      } else {
        dispatch({ type: 'WEATHER_NOT_FOUND' })
      }
    } catch (err) {
      console.log('Something went wrong')
      dispatch({ type: 'WEATHER_FETCH_FAILURE' })
    }
  }

  return (
    <>
      {weatherState.isLoading && (
        <div className='overlay'>
          <Svg />
        </div>
      )}
      <div className='search'>
        <Search
          fetchWeatherData={fetchWeatherData}
          isFound={weatherState.isFound}
          isError={weatherState.isError}
        />
      </div>
      <Main weatherDetails={weatherState.current} />
      <Forecast weatherDetails={weatherState} />
    </>
  )
}

export default App

/*
  // const [location, setLocation] = useState('')
  // const fetchWeatherData = useCallback(
  //   async (
  //     API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=484e22ac48a07e933f51d434b4c7b759`
  //   ) => {
  //     console.log('Fetching data from API')
  //     if (!location.trim()) return

  //     try {
  //       const response = await fetch(API_ENDPOINT)
  //       const data = await response.json()

  //       if (data.cod != '404') {
  //         dispatch({ type: 'WEATHER_FETCH_SUCCESS', payload: data })
  //       } else {
  //         console.log('City Not Found')
  //       }
  //     } catch (err) {
  //       console.log('Something went wrong')
  //     }
  //   },
  //   [location]
  // )

  // useEffect(() => {
  //   fetchWeatherData()
  // }, [fetchWeatherData])

  // const gpsHandler = (lat, lon) => {
  //   const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=484e22ac48a07e933f51d434b4c7b759`
  //   fetchWeatherData(API_ENDPOINT)
  // }
*/

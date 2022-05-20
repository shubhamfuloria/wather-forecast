import { BsMicFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import styles from './style.module.css'
import { useState } from 'react'

// const Search = ({ onSearch, onGps }) => {
//true / false
const Search = ({ fetchWeatherData, isFound, isError }) => {
  const [inputVal, setInputVal] = useState('')

  const inputChangeHandler = event => {
    setInputVal(event.target.value)
  }

  const SearchHandler = event => {
    if (event.keyCode !== 13) return
    // onSearch(inputVal)
    fetchWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=484e22ac48a07e933f51d434b4c7b759`,
      `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=484e22ac48a07e933f51d434b4c7b759`
    )
  }

  const locationHandler = event => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        // onGps(pos.coords.latitude, pos.coords.longitude)
        const lat = pos.coords.latitude
        const long = pos.coords.longitude
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=484e22ac48a07e933f51d434b4c7b759`,
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=484e22ac48a07e933f51d434b4c7b759`
        )
      },
      () => 1,
      { enableHighAccuracy: true, maximumAge: 10000 }
    )
  }

  const voiceHandler = event => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.start()

    recognition.onresult = event => {
      const location = event.results[0][0].transcript
      fetchWeatherData(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=484e22ac48a07e933f51d434b4c7b759`,
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=484e22ac48a07e933f51d434b4c7b759`
      )
    }
  }

  return (
    <>
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Search'
          value={inputVal}
          onChange={inputChangeHandler}
          onKeyUp={SearchHandler}
        />
        <BsMicFill onClick={voiceHandler} />
        <HiLocationMarker onClick={locationHandler} />
        {isError ? (
          <p>Please check your internet</p>
        ) : isFound == false ? (
          <p>City Not found</p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  )
}

export default Search

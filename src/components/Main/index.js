import Weather from '../Weather'
import Details from '../Details'
import Visuals from '../Visuals'
import styles from './style.module.css'

const Main = ({
  weatherDetails: {
    city,
    country,
    state,
    date,
    temp,
    sunrise,
    humidity,
    windSpeed,
    sunset
  }
}) => {
  return (
    <div className={styles.main}>
      <Weather
        city={city}
        country={country}
        state={state}
        date={date}
        temp={temp}
      />
      <Details
        sunrise={sunrise}
        humidity={humidity}
        windSpeed={windSpeed}
        sunset={sunset}
      />
      <Visuals state={state} />
    </div>
  )
}

export default Main

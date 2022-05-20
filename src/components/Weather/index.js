import styles from './style.module.css'
import { GiSpeaker } from 'react-icons/gi'

const Weather = ({ city, country, temp, state, date }) => {
  return (
    <div className={styles.weather}>
      <p>
        {city}
        <span>{country}</span>
      </p>
      <h1>{temp}</h1>
      <span>{state}</span>
      <span>{date}</span>
    </div>
  )
}

export default Weather

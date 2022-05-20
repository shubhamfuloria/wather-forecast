import styles from './style.module.css'
import { BsSunsetFill, BsSunriseFill } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import { SiWindicss } from 'react-icons/si'
import { GiSpeaker } from 'react-icons/gi'

const Details = ({ sunrise, humidity, windSpeed, sunset }) => {
  return (
    <div className={styles.details}>
      <div className={styles.sunrise}>
        <BsSunriseFill />
        <span>{sunrise}</span>
      </div>
      <div className={styles.humidity}>
        <WiHumidity />
        <span>{humidity}</span>
      </div>
      <div className={styles.wind}>
        <SiWindicss />
        <span>{windSpeed}</span>
      </div>
      <div className={styles.sunset}>
        <BsSunsetFill />
        <span>{sunset}</span>
      </div>
    </div>
  )
}

export default Details

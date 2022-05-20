import styles from './style.module.css'
import {
  BsFillCloudDrizzleFill,
  BsFillCloudFog2Fill,
  BsFillSunFill
} from 'react-icons/bs'
import { AiFillCloud } from 'react-icons/ai'
import { GiSpeaker } from 'react-icons/gi'

const Card = ({ data: { temp, state, date } }) => {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>
        {state === 'Clouds' ? (
          <AiFillCloud />
        ) : state === 'Rain' ? (
          <BsFillCloudDrizzleFill />
        ) : state === 'Haze' ? (
          <BsFillCloudFog2Fill />
        ) : (
          <BsFillSunFill />
        )}
      </span>
      <span className={styles.temp}>{temp}</span>
      <span className={styles.status}>{state}</span>
      <span className={styles.date}>{date}</span>
    </div>
  )
}

const Forecast = ({ weatherDetails }) => {
  const forecast = weatherDetails.forecast
  const current = weatherDetails.current
  const speechHadler = () => {
    const synth = window.speechSynthesis
    const utter = new SpeechSynthesisUtterance()

    utter.text = `Namaskar...... mera naam Pinky hai. Aapke shahar ${current.city} mein mosam bahut suhana hai. ${current.city} ka taapmaan ${current.temp} hai.`

    utter.pitch = 2
    utter.lang = 'hi-IN'
    synth.speak(utter)
  }
  return (
    <>
      <div className={styles.speaker}>
        <GiSpeaker onClick={speechHadler} />
      </div>
      <div className={styles.forecast}>
        <Card data={forecast[0]} />
        <Card data={forecast[1]} />
        <Card data={forecast[2]} />
        <Card data={forecast[3]} />
        <Card data={forecast[4]} />
      </div>
    </>
  )
}

export default Forecast

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
    console.log(weatherDetails)
    const synth = window.speechSynthesis
    const utter = new SpeechSynthesisUtterance()

    utter.text = `Hi there, Today ${current.date} the weather in ${current.city} is ${current.temp}.`
    utter.lang = 'hi-IN'
    utter.rate = 0.9
    synth.cancel()
    synth.speak(utter)
    console.log('Speaking')
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

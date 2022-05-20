import styles from './style.module.css'
const sun = require('../../assets/images/sun.png')
const cloudySun = require('../../assets/images/cloudySun.png')
const haze = require('../../assets/images/haze.png')
const rain = require('../../assets/images/rain.png')

const Visuals = ({ state }) => {
  return (
    <div className={styles.image}>
      <img
        src={
          state === 'Clouds'
            ? cloudySun
            : state === 'Haze'
            ? haze
            : state === 'Rain'
            ? rain
            : sun
        }
        draggable='false'
        alt='weather icon'
      />
    </div>
  )
}

export default Visuals

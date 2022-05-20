const initialState = {
  isLoading: false,
  isFound: true,
  isError: false,
  current: {
    city: 'Dehradun',
    temp: '0°C',
    state: 'Rainy',
    date: 'Mon 05 May',
    country: 'IN',
    sunrise: '12:00 AM',
    humidity: '8',
    windSpeed: '8 KM/h',
    sunset: '06:00 PM'
  },
  forecast: [
    { temp: '0°C', state: 'Rainy', date: 'Tue 06 May' },
    { temp: '0°C', state: 'Rainy', date: 'Tue 06 May' },
    { temp: '0°C', state: 'Rainy', date: 'Tue 06 May' },
    { temp: '0°C', state: 'Rainy', date: 'Tue 06 May' },
    { temp: '0°C', state: 'Rainy', date: 'Tue 06 May' }
  ]
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weatherReducer = (state, action) => {
  const day = days[new Date().getDay()]

  const getForecastArray = () => {
    const array = []

    for (let i = 1; i <= 5; i++) {
      const day = days[(new Date().getDay() + i) % 7]
      const data = action.payload.forecast.list[8 * i - 1]
      const obj = {
        temp: (data.main.temp - 273.15).toFixed(0) + '°C',
        state: data.weather[0].main,
        date: `${day} ` + new Date(data.dt * 1000).toLocaleDateString()
      }

      array.push(obj)
    }
    return array
  }

  switch (action.type) {
    case 'WEATHER_FETCH_INIT':
      return {
        ...state,
        isLoading: true
      }

    case 'WEATHER_FETCH_SUCCESS':
      return {
        isLoading: false,
        isFound: true,
        current: {
          city: action.payload.current.name,
          temp: (action.payload.current.main.temp - 273.15).toFixed(1) + '°C',
          state: action.payload.current.weather[0].main,
          country: action.payload.current.sys.country,
          date:
            `${day} ` +
            new Date(action.payload.current.dt * 1000).toLocaleDateString(),
          sunrise: new Date(
            action.payload.current.sys.sunrise * 1000
          ).toLocaleTimeString(),
          humidity: action.payload.current.main.humidity + '%',
          windSpeed: action.payload.current.wind.speed + ' m/s',
          sunset: new Date(
            action.payload.current.sys.sunset * 1000
          ).toLocaleTimeString()
        },
        forecast: getForecastArray()
      }

    case 'WEATHER_NOT_FOUND':
      return { ...state, isLoading: false, isFound: false, isError: false }

    case 'WEATHER_FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true, isFound: true }

    default:
      return state
  }
}

export default weatherReducer
export { initialState }

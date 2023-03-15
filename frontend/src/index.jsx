import React from 'react';
import ReactDOM from 'react-dom/client';

// Set Base URL based on the fact if it's running in development or production server
const baseURL = ((import.meta.env.PROD) ? '/api' : 'http://localhost:9000/api');

const getWeatherFromApi = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseURL}/weather/${latitude}/${longitude}`);
    if(!import.meta.env.PROD){
      console.log(`Backend at ${baseURL}`);
    }
    return response.json();
  } catch (error) {
    if(!import.meta.env.PROD){
      console.error(error);
    }
    return {};
  }
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      country: '',
      todayIcon: '',
      todayDescription: '',
      tomorrowIcon: '',
      tomorrowDescription: '',
    };
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const weather = await getWeatherFromApi(latitude, longitude);
        this.setState({
          city: weather.city,
          country: weather.country,
          geolocationEnabled: true,

          todayIcon: weather.today.icon.slice(0, -1),
          todayDescription: `${weather.today.main}: ${weather.today.description}`,
          
          tomorrowIcon: weather.tomorrow.icon.slice(0, -1),
          tomorrowDescription: `${weather.tomorrow.main}: ${weather.tomorrow.description}`,
        });
      }, () => {
        this.setState({ geolocationEnabled: false });
      });
    } else {
      this.setState({ geolocationEnabled: false });
    }
  }

  render() {
    const { todayIcon, todayDescription, tomorrowIcon, tomorrowDescription, city, country, geolocationEnabled } = this.state;
    return (
      <div>
        {!geolocationEnabled && <GeolocationPrompt />}

        { city && country && <h1>Weather in {city}, {country}</h1> }
        {todayIcon &&  todayDescription && <h2>Today: </h2>}
        <div className="icon">
          { todayIcon && <img src={`/img/${todayIcon}.svg`} alt={todayDescription} /> }
        </div>

        {tomorrowIcon && tomorrowDescription && <h2>Tomorrow: </h2>}
        <div className="icon">
          { tomorrowIcon && <img src={`/img/${tomorrowIcon}.svg`} alt={tomorrowDescription} /> }
        </div>
      </div>
    );
  }
}

const GeolocationPrompt = () => {
  return (
    <div className="geolocation-prompt">
      <p>Please enable geolocation in your browser to see the current weather for your location.</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Weather />,
);
import React from 'react';
import ReactDOM from 'react-dom/client';
// Set Base URL based on the fact if it's running in development or production server
const baseURL = ((import.meta.env.PROD) ? '/api' : 'http://localhost:9000/api');

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    console.log(`Backend at ${baseURL}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  async componentDidMount() {
    const weather = await getWeatherFromApi();
    this.setState({ icon: weather.icon.slice(0, -1) });
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} alt="Weather" /> }
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Weather />,
);

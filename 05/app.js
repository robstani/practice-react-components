import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warsaw: null,
      krakow: null,
      wroclaw: null,
    };
  }

  componentDidMount() {
    const apiKey = '9380bf571ae140669d036b3cdd282553'; 
    const urls = {
      warsaw: `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=52.232222&lon=21.008333`,
      krakow: `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=50.061389&lon=19.938333`,
      wroclaw: `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=51.11&lon=17.022222`,
    };

    Promise.all([
      fetch(urls.warsaw).then(response => response.json()),
      fetch(urls.krakow).then(response => response.json()),
      fetch(urls.wroclaw).then(response => response.json()),
    ])
      .then(([warsawData, krakowData, wroclawData]) => {
        this.setState({
          warsaw: warsawData.data[0],
          krakow: krakowData.data[0],
          wroclaw: wroclawData.data[0],
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  renderWeatherData(city, data) {
    if (data) {
      return (
        <div>
          <h1>Informacje o pogodzie dla {city}</h1>
          <p>Miasto: {data.city_name}</p>
          <p>Temperatura: {data.temp}°C</p>
          <p>Opis: {data.weather.description}</p>
        </div>
      );
    }

    return null;
  }

  render() {
    const { warsaw, krakow, wroclaw } = this.state;

    return (
      <div className="App">
        {this.renderWeatherData('Warszawa', warsaw)}
        {this.renderWeatherData('Kraków', krakow)}
        {this.renderWeatherData('Wrocław', wroclaw)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

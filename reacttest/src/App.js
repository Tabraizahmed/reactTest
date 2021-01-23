import React from 'react';
import './App.css';
import './cities';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cities: [],
    };
  }

  componentDidMount = () => {
    this.fetchCities();
  };

  fetchCities = (searchString) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          
          this.setState({ cities: searchString === undefined ? window.Cities : window.Cities.filter((city)=>city.name.toLowerCase() === searchString.toLowerCase()) }, () => {
            this.renderCities(this.state.cities);
          })
        );
      }, 2000);
    });
  };

  renderCities = (cities) => {
    const citiesTableBody = document.querySelector('#cities-table tbody');
    const rowsHtml = cities
      .map(
        (city) => `
    <tr>
      <td>${city.name}</td>
      <td>${city.country}</td>
      <td>${city.population}</td>
    </tr>
  `
      )
      .join('');
    citiesTableBody.innerHTML = rowsHtml;
  };
  render() {
    return (
      <div className='App'>
        <div id='challenge'>
          <input type='text' />
          <button>Search</button>
          <table id='cities-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }
}

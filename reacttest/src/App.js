import React from 'react';
import './App.css';
import './cities';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cities: [],
      searchString: "",
      loading: false,
      isSearchBtnVisible:true
    };
  }

  componentDidMount = () => {
    this.fetchCities();
  };

  fetchCities = (searchString) => {
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          
          this.setState({loading:false,cities: searchString === undefined ? window.Cities : window.Cities.filter((city)=>city.name.toLowerCase() === searchString.toLowerCase()) }, () => {
            this.renderCities(this.state.cities);
          })
        );
      }, 2000);
    });
  };

  searchCities = () => {
    this.fetchCities(this.state.searchString);
    this.setState({ isSearchBtnVisible: false });
  }

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

  onBlur = (e) => {
    if (this.state.isSearchBtnVisible) {
      this.setState({ searchString: e.target.value });
      return;
    }
     this.fetchCities(e.target.value);
  }
  
  render() {
    return (
      <div className='App'>
        <div id='challenge'>
          <input type='text' onBlur={this.onBlur} name="searchString" />
          {
            this.state.isSearchBtnVisible === true ?
          <button onClick={this.searchCities}>Search</button>
              :""
          }
          <table id='cities-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {this.state.loading===true?"searching...":""}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

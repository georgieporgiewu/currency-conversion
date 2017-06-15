import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import Dropdown from 'react-dropdown'
import './App.css';

const options = [
'one', 'two', 'three'
];
const defaultOption = options[0];

class App extends Component {

  constructor() {
    super();

    this.state = {
      input: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectFrom = this.onSelectFrom.bind(this);
    this.onSelectTo = this.onSelectTo.bind(this);
  }

  componentWillMount() {
    this.getCurrencyList();
  }

  getCurrencyList() {
  //   console.log("getCurrencyList()");
  //   $(document).ready(function () {
  // //your code here
  // console.log("document ready");
  //   });

    return $.getJSON('http://api.fixer.io/latest')
      .then((data) => {
        console.log("data: " + Object.keys(data));
        // base, date, rates
        console.log("rates: " + Object.keys(data.rates));
        console.log("results: " + data.results);

        let arr = Object.keys(data.rates);
        console.log("typeof converted: " + typeof arr);
        console.log("typeofrates: " + typeof this.state.rates);

        console.log("select 0: " + arr[0]);

        this.setState({ rates: arr, selectedFromRate: arr[0] });
      });
  }

  handleInputChange(event) {
    console.log("handleChange called with: " + event.target.value);
    this.setState({
      input: event.target.value,
    });
  }

  onSelectFrom(event) {
    console.log("value: " + event.value);
    this.setState({selectedFromRate: event.value});
  }

  onSelectTo(event) {
    console.log("value: " + event.value);
    this.setState({selectedToRate: event.value});
  }

  render() {
    console.log("rates hree at render: " + this.state.rates);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Currency Conversion</h2>
        </div>
        <p className="App-intro">
          Input your currency amount:
          <input
              style={{marginLeft:10}}
              type="number"
              value={this.state.input}
              onChange={this.handleInputChange} />
        </p>
        <table>
          <tr>
            <td>Select your input currency</td>
            <td>
              <Dropdown options={this.state.rates} onChange={this.onSelectFrom} value={this.state.selectedFromRate} placeholder="Select an option" />
            </td>
            <td>Select your desired result currency</td>
            <td>
              <Dropdown options={this.state.rates} onChange={this.onSelectTo} value={this.state.selectedToRate} placeholder="Select an option" />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;

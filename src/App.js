import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from 'react-dropdown'
import './App.css';

const dropDownDefaultText = "Select a  currency";

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: 0
    };
    // event listeners bound here to avoid rebinding on every render() call
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectFromRate = this.onSelectFromRate.bind(this);
    this.onSelectToRate = this.onSelectToRate.bind(this);
  }

  componentWillMount() {
    this.getCurrencyList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedToRate !== this.state.selectedToRate
        || prevState.selectedFromRate !== this.state.selectedFromRate
        || prevState.input !== this.state.input) {
      this.getExchangeRate();
    }
  }

  getCurrencyList() {
    return $.getJSON('https://api.fixer.io/latest')
      .then((data) => {
        let arr = Object.keys(data.rates);
        this.setState({ rates: arr });
      });
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  onSelectFromRate(event) {
    this.setState({selectedFromRate: event.value});
  }

  onSelectToRate(event) {
    this.setState({selectedToRate: event.value});
  }

  getExchangeRate() {
    if (this.state.selectedFromRate === undefined
        || this.state.selectedToRate === undefined) {
          return;
    }
    return $.getJSON('https://api.fixer.io/latest',
                      {base:this.state.selectedFromRate})
            .then((data) => {
              this.setState({
                              calculatedResult : this.state.input * data.rates[this.state.selectedToRate]
                            });
    });
  }

  render() {

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
          <tbody>
            <tr>
              <td>Select your input currency:</td>

              <td>
                <Dropdown
                    options={this.state.rates}
                    onChange={this.onSelectFromRate}
                    value={this.state.selectedFromRate}
                    placeholder={dropDownDefaultText} />
              </td>

              <td>Select your desired result currency:</td>

              <td>
                <Dropdown
                   options={this.state.rates}
                   onChange={this.onSelectToRate}
                   value={this.state.selectedToRate}
                   placeholder={dropDownDefaultText} />
              </td>

            </tr>
          </tbody>
        </table>

        <div style={{paddingTop:10,}}>
          Result: <h3>{this.state.calculatedResult}</h3>
        </div>

      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      validData: false,
      inputValue: [],
    };
  }

  handleInputChange = (event) => {
    // sets validData to false if text in search bar is not a number
    // and thus, will not fetch zip code search results and instead
    // only renders message prompting user to input valid zip code 
    // otherwise, sets inputValue to integer inputted into search bar
    if (!isNaN(event.target.value)) {
      this.setState({inputValue: event.target.value});
    }
    this.setState({validData: false});
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // sets validData to false if inputValue's length is not a valid zip code length of 5
    this.setState({validData: (this.state.inputValue.length === 5)});
  };

  componentDidUpdate() {
    // will only fetch data if data is valid (aka only a string and of length 5)
    if (this.state.validData) {
      const apiURL = `http://ctp-zip-api.herokuapp.com/zip/${this.state.inputValue}`;
      fetch(apiURL)
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            items: response,
          });
        });
      }
  }

  render() {
    let { items, validData } = this.state;

    return (
      <div className="App">
        <header>Zip Code Search</header>

        <form className="input-bar" onSubmit={this.handleSubmit}>
          <p className="input-header">Zip Code:&nbsp;</p>
          <input
            placeholder="Enter a zip code"
            onChange={this.handleInputChange}
            className="search-box"
          ></input>
        </form>

        {/* if input value contains anything other than integers or of any invalid zip code length , display*/}
        {!validData &&
          <div className="no-results-message">Please enter valid zip code</div>
        }

        {/* if input value is both only integers and of length 5, display zip code search results */}
        {validData &&   
          <div>
              {items.map((item) => (
                <div class="zip-code-results-card">
                  <p className="zip-code-results-header">{item.City}, {item.State}</p>
                  <ul>
                    <li key={item.RecordNumber}>
                      State: {item.State}
                    </li>
                    <li>
                      Zipcode: {item.Zipcode}
                    </li>
                    <li>
                      Location: ({item.Lat}, {item.Long})
                    </li>
                      {item.Population && 
                        <li>
                          Population(estimated) : {item.EstimatedPopulation}
                        </li>
                      }
                      {item.TotalWages && (
                        <li>
                          Total Wages: {item.TotalWages}
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
          </div>
        }
      </div>
    );
  }
}

export default App;

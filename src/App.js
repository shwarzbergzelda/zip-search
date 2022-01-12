import React, { Component } from "react";

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
    if (!isNaN(event.target.value)) {
      this.setState({inputValue: event.target.value});
    }
    this.setState({validData: false});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({validData: (this.state.inputValue.length === 5)});
  };

  componentDidUpdate() {
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
        <form className="input-bar" onSubmit={this.handleSubmit}>
          <p>Zip Code:</p>
          <input
            placeholder="Input a Zip Code"
            onChange={this.handleInputChange}
          ></input>
        </form>

    
        {!validData &&
          <div>Please enter valid zip code</div>
        }
        
        {validData &&   
          <div>
              {items.map((item) => (
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
                ))}
          </div>
        }
      </div>
    );
  }
}

export default App;

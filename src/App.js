import react, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      Results: [],  
    };
  }
  handleInput = (event) => {
    this.setState({items: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  componentWillMount() {
    fetch("http://ctp-zip-api.herokuapp.com/zip/10016")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          items: response,
        });
      });
  }

  render() {
    let { items } = this.state;

    return (
      <div className="App">
      <form className="input-bar" onSubmit={this.handleSubmit}>
            <p>Zip Code:</p>
            <input placeholder="Input a Zip Code" onChange={this.handleInput}></input>
          </form>
        <ul>
          {items.map((item) => (
            <li kenpy={item.id}>
              State: {item.State}
              <br />
              Zipcode: {item.Zipcode}
              <br />
              Location: ({item.Lat}, {item.Long})
              <br />
              Population(estimated) : {item.EstimatedPopulation}
              <br />
              Total Wages: {item.TotalWages}
            </li>
          ))}
        </ul>
        <ZipResults results={this.state.results} />
      </div>
    );
  }
}

export default App;

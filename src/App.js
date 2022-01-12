import react, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],

      inputValue: [],  
    };
  }
  handleInputChange = (event) => {
    this.state.inputValue = event.target.value
  }

  handleSubmit = (event) => {
    event.preventDefault()
    alert(this.state.inputValue)
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
            <input placeholder="Input a Zip Code" onChange={this.handleInputChange}></input>
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
      </div>
    );
  }
}

export default App;

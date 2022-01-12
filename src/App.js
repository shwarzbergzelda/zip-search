import react, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
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

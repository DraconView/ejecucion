import { Component } from "react";
console.log('llamando a GitInputComparison');
class GitInputComparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue1: "",
      inputValue2: "",
    };
  }

  handleInputChange = (event, inputNumber) => {
    const value = event.target.value;
    this.setState({
      [`inputValue${inputNumber}`]: value,
    });
  };

  compareInputs = () => {
    const { inputValue1, inputValue2 } = this.state;
    let difference = "";

    if (inputValue1.length > inputValue2.length) {
      difference = inputValue1.slice(inputValue2.length);
    } else {
      difference = inputValue2.slice(inputValue1.length);
    }

    return difference;
  };

  render() {
    return (
      <div>
        <textarea
          value={this.state.inputValue1}
          onChange={(e) => this.handleInputChange(e, 1)}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <textarea
          value={this.state.inputValue2}
          onChange={(e) => this.handleInputChange(e, 2)}
          style={{ whiteSpace: "pre-wrap" }}
        />
        <p>Difference: {this.compareInputs()}</p>
      </div>
    );
  }
}

export default GitInputComparison;

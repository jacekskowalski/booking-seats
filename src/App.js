import React, { Component } from 'react';
import SelectSeats from "./actions/selectSeats";
import SelectAdjacentSeats from "./actions/selectAdjacentSeatsAction";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isCorrectInput: true,
      isChecked: false
    }

  }
  handleClick = (e) => {
    if (this.inputNode.value < 1 || this.inputNode.value > 20) {
      e.preventDefault();
      this.setState({ isCorrectInput: false });
    }
    if (this.state.isChecked) {
      this.props.SelectAdjacentSeats(this.state.isChecked);
    }
    this.props.SelectSeats(this.inputNode.value);
    this.props.history.push("/booking");
  }

  checkIfChecked = (e) => {
    this.setState({
      isChecked: e.target.checked
    })
  }

  render() {
    return (
      <div className="form">
        <div className="form__group">
          <label for="seats" class="form__label">Number of seats:</label>
          <input type="number" name="nr" class="form__input form__input-number" ref={node => (this.inputNode = node)} id="seats" min="1" max="20"
            required />
        </div>
        <div className="hidden-info"><span className={`text--small text--error ${this.state.isCorrectInput === true ? "popup" : "popup-active"}`}>Minimum 1, maximum 20</span></div>
        <div className="form__group margin-m">
          <input type="checkbox" class="form__seats__selector" name="seats" value="neighbouring_seats"
            defaultChecked={this.state.isChecked} onChange={this.checkIfChecked} />
          <label for="seats" class="form__label"> Should seats be adjacent?</label>
        </div>
        <div className="form__group margin-m">
          <button className="btn btn--default btn--size_xl" onClick={this.handleClick}>Choose seats</button>
        </div>

      </div>


    );
  }
}
function mapStateToProps(state) {
  return {
    seats: state.selectedSeats,
    isAdjacent: state.seatsAdjacentChecker
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    SelectSeats: (calc) => dispatch(SelectSeats(calc)),
    SelectAdjacentSeats: (checked) => dispatch(SelectAdjacentSeats(checked))
    , dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

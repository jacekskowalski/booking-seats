import React, { Component } from "react";
import Seat from "./Seat";
import { connect } from "react-redux";

class RoomSchema extends Component {

  selectAdjacentSeats() {
    let tempObj = [];
    let nrOfSeats = this.props.seats.total;
    let idSeatsArray = new Set();

    this.props.details.map(element => {
      if (nrOfSeats === 0) return;
       
      if (element.reserved === false && nrOfSeats > 0) {
        idSeatsArray.add(element.id);
        const temp = `Row ${element.cords.x} seat ${element.cords.y}`;
        tempObj.push(temp);
        nrOfSeats--;

      } else {
        nrOfSeats = this.props.seats.total;
        idSeatsArray = new Set();
        tempObj= [];
      }
    });

    return [tempObj, idSeatsArray];
  }

  selectRandomSeats() {
    let tempObj = [];
    let nrOfSeats = this.props.seats.total;
    let idSeatsArray = new Set();

    while (nrOfSeats > 0) {
      const randomNumber = Math.floor(Math.random() * this.props.details.length);

      if (this.props.details[randomNumber].reserved === false) {
        idSeatsArray.add(this.props.details[randomNumber].id);
        const temp = `Row ${this.props.details[randomNumber].cords.x} seat ${this.props.details[randomNumber].cords.y}`;
        tempObj.push(temp);
        nrOfSeats--;
      }

    }
    return [tempObj, idSeatsArray];
  }

  handleClick = (e) => {
    this.props.history.push('/summary');
  }

  displayProps() {
    let posXpc = 0;
    let posYpc = 0;
    let posXmob = 0;
    let posYmob = 0;
    let adjacentNumbersArray = [];
    let randomNumberArray = []
    let arrayToJson;
    let getIdsSeats = new Set();
    const screenWidth = window.matchMedia('(max-width: 768px)');
    let mobileView = screenWidth.matches;

    if (this.props.isAdjacent.isChecked === true) {
      const obj = this.selectAdjacentSeats();
      adjacentNumbersArray = obj[0];
      arrayToJson = JSON.stringify(adjacentNumbersArray);
      getIdsSeats = obj[1];
 
    } else {
      const obj = this.selectRandomSeats();
      randomNumberArray = obj[0];
      arrayToJson = JSON.stringify(randomNumberArray);
      getIdsSeats = obj[1];
    }

    localStorage.setItem("seatsPosition", arrayToJson);
    return this.props.details.map(element => {
      posXpc = (element.cords.x) * 50;
      posYpc = (element.cords.y) * 50;
      posXmob = (element.cords.x) * 20;
      posYmob = (element.cords.y) * 20;
      {
        if (!mobileView) {
          if (element.reserved === true) {
            return (
              <Seat key={element.id} className="seat"
                top={posXpc} left={posYpc} isReserved={true} isRecommended={false} />
            );
          } else if (element.reserved === false && getIdsSeats.has(element.id)) {
            return (
              <Seat key={element.id} className="seat"
                top={posXpc} left={posYpc} isReserved={false} isRecommended={true} />
            );
          } else {
            return (
              <Seat key={element.id} className="seat"
                top={posXpc} left={posYpc} isReserved={false} isRecommended={false} />
            );
          }
        }
        else {
          if (element.reserved === true) {
            return (
              <Seat key={element.id} className="seat"
                top={posXmob} left={posYmob} isReserved={true} isRecommended={false} />
            );
          } else if (element.reserved === false && getIdsSeats.has(element.id)) {
            return (
              <Seat key={element.id} className="seat"
                top={posXmob} left={posYmob} isReserved={false} isRecommended={true} />
            );
          } else {
            return (
              <Seat key={element.id} className="seat"
                top={posXmob} left={posYmob} isReserved={false} isRecommended={false} />
            );
          }
        }
      }

    });
  }
  render() {
    return (
      <div className="section__roomschema">

        <div className="seats__generator">
          {
            this.displayProps()
          }
        </div>
        <div className="row">
          <div className="col">
            <div className="btn--custom defaultBackground btn--border"></div>
            <div className="btn--label">Seats available</div>
          </div>
          <div className="col">
            <div className="btn--custom reserved"></div>
            <div className="btn--label">Seats reserved</div>
          </div>
          <div className="col">
            <div className="btn--custom active"></div>
            <div className="btn--label">Your choice</div>
          </div>
          <button className="btn btn--default" onClick={this.handleClick}>Book</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(item) {
  return {
    seats: item.selectedSeats,
    details: item.data,
    isAdjacent: item.seatsAdjacentChecker
  };
}

export default connect(mapStateToProps)(RoomSchema);
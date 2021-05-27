import React, { Component } from 'react';

export default class Summary extends Component {
    constructor() {
        super();
        this.state = {
            jsonToArray: JSON.parse(localStorage.getItem("seatsPosition"))
        }

    }

    render() {
        return (
            <div className="section__summary">
                <h1>Your booking has been successful</h1>

                <ul>
                    { 
                        this.state.jsonToArray.
                            map((element, key) =>
                                <li key={key} className="list">{element}</li>)
                    }
                </ul>
                <p>Thank you! In case of problems please contact with the Administration department</p>
            </div>
        );
    }
}
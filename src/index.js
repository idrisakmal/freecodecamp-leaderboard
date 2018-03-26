import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import '../assets/index.scss'


class Leaderboard extends React.Component {
   
    state = {
        filter: '',
        data: {} 
    }

    componentDidMount() {
        this.getUsers('recent');
    }

    handleAlltimeClick = (event) => {
        event.preventDefault();
        this.getUsers('alltime');
    }

    handleRecentClick = (event) => {
        event.preventDefault();
        this.getUsers('recent');
    }

    getUsers = filter =>
        new Promise(resolve =>
            this.state.data.hasOwnProperty(filter)
                ? resolve(this.state.data[filter])
                : axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/${filter}`)
                    .then(response => resolve(response.data))
        )
        .then(data =>
            this.setState(prevState => ({ data: Object.assign({}, prevState.data, { [filter]: data }), filter: filter }))
        )

    render () {
        return (
            <React.Fragment>
                <nav className="navbar is-primary" role="navigation" aria-label="main navigation" style={{ marginBottom: 30 }}>
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="Bulma: a modern CSS framework based on Flexbox" width="200" height="32" />
                        </a>
                    </div>
                </nav>
                <div className="container">
                    <h1 className="title is-4">FreeCodeCamp Brownie Points Leaderboard</h1>
                    <h1 className="subtitle">Showing: {this.state.filter.toUpperCase()}</h1>
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Camper Name</th>
                                <th><span onClick={this.handleRecentClick}>Points in past 30 days</span></th>
                                <th><span onClick={this.handleAlltimeClick}>All time points</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.hasOwnProperty(this.state.filter) 
                                    ? this.state.data[this.state.filter].map((person, i) => 
                                        <Camper 
                                            key={i}
                                            index={i}
                                            name={person.username}
                                            img={person.img}
                                            alltime={person.alltime}
                                            recent={person.recent}
                                        />
                                    )
                                    : <tr><td col="4">Loading...</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

class Camper extends React.Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.recent}</td>
                    <td>{this.props.alltime}</td>
                </tr>
            </React.Fragment>
        )
    }
}




ReactDOM.render(<Leaderboard />, document.getElementById("app"))
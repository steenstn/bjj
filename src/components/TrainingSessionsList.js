import React, { Component } from 'react';

class TrainingSessionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          sessions: []
        };
    }
  
    componentDidMount() {
      let token = localStorage.getItem("token");
        fetch(process.env.REACT_APP_BACKEND_URL + "/trainingsessions", {
          method: 'GET',
          headers: {
              "Authorization": `Bearer ${token}`
          },
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                sessions: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
  
  handleDelete(id) {
      let token = localStorage.getItem("token");
      fetch(process.env.REACT_APP_BACKEND_URL + `/trainingsessions/${id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
          }
      })
        .then(response => response.json())
        .then(removedItem => {
          const updatedList = this.state.sessions.filter(session => session.id !== removedItem.id)
          this.setState({sessions: updatedList})
      })
    }
  
      render() {
        const { error, isLoaded, sessions } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul>
              {sessions.map(session => (
                  <li>
                    {session.id} {session.date} {session.trainingType} {session.lengthMin} <button onClick={() => this.handleDelete(session.id)}>x</button>
                  </li>
              ))}
            </ul>);
        }
      }
    }
    
    export default TrainingSessionsList;
    
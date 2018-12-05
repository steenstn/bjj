import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class TrainingSessionsList extends Component {
    constructor(props) {
      super(props);
      this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          sessions: [],
          deleteDialogOpen: false,
          sessionID: ""
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
      fetch(process.env.REACT_APP_BACKEND_URL + `/trainingsessions/${id}/delete`, {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
          }
      })
        .then(() => {
          const updatedList = this.state.sessions.filter(session => session.id !== id)
          this.setState({sessions: updatedList, deleteDialogOpen: false})
      })
    }
  
    openDeleteDialog(id) {
      this.setState({ deleteDialogOpen: true, sessionID: id });
    }
  
    closeDeleteDialog() {
      this.setState({ deleteDialogOpen: false });
    }
  
      render() {
        const { error, isLoaded, sessions, deleteDialogOpen, sessionID } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <ul>
                {sessions.map(session => (
                    <li key={session.id}>
                    {session.id} {session.date} {session.trainingType} {session.lengthMin} <button onClick={() => this.openDeleteDialog(session.id)} key={session.id}>x</button>
                  </li>
                ))}
              </ul>
              <Dialog open={deleteDialogOpen} onClose={this.closeDeleteDialog} aria-describedby="alert-dialog-description">
                <DialogContent><DialogContentText id="alert-dialog-description">Are you sure you want to delete this training session?</DialogContentText></DialogContent>
                <DialogActions>
                  <button onClick={this.closeDeleteDialog}>No, keep this session</button>
                  <button onClick={() => this.handleDelete(sessionID)}>Yes, delete this session</button>
                </DialogActions>
              </Dialog>
            </div>);
        }
      }
    }
    
    export default TrainingSessionsList;
    
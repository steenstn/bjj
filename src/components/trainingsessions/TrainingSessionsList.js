import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import './TrainingSessionList.css';

class TrainingSessionsList extends Component {
    constructor(props) {
      super(props);
        this.state = {
          error: null,
          isLoaded: false,
          sessions: [],
          deleteDialogOpen: false,
          sessionID: ""
        };
    }
  
    handleDelete = (id) => {
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
  
    openDeleteDialog = (id) => {
      this.setState({ deleteDialogOpen: true, sessionID: id });
    }
  
    closeDeleteDialog = () => {
      this.setState({ deleteDialogOpen: false });
    }
  
      render = () => {
        let sessions = this.props.sessions;
        const { deleteDialogOpen, sessionID } = this.state;
        if (!sessions) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <ul className="list">
                {sessions.map(session => (
                    <li className="listEntry" key={session.id}>
                    {session.date} Type: {session.trainingType} Length: {session.lengthMin} min<button className="deleteButton" onClick={() => this.openDeleteDialog(session.id)} key={session.id}>x</button>
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
    
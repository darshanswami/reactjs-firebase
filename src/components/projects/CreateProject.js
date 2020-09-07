import React, { Component, useRef } from 'react'
import firebase from "firebase";
import { withAuthorization } from '../Session';
import JoditEditor from 'jodit-react'

class CreateProject extends Component {
  constructor(props) {
    super(props);
    const editor = useRef
    const config = {
      readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    this.state = {title: '',content: '', errors: '',user: '', loading:false, editor:editor, setContent:'', config:config};
  }
  
  handleChange = (e) => {
    console.log(e.target);
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleTextAreaChange = newTextAreaValue => {
      console.log('handleTextAreaChange', newTextAreaValue)
      this.setState({
        content: newTextAreaValue
      })
  }

  handleSubmit = (e) => {
    const firestore = firebase.firestore();
    e.preventDefault();
    this.setState({ loading: true});
    console.log(this.state);

    if(this.validation()) {
      const ref = firebase.firestore().collection('users').doc(this.state.user.uid);
      ref.get().then((doc) => {
        var userData = doc.data();
        
        firestore.collection("projects").add({
          title: this.state.title,
          content: this.state.content,
          authorFirstName: userData.firstname,
          authorLastName: userData.lastname,
          authorId: userData.uid,
          created: new Date()
        })
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            
            this.setState({
              title: "",
              content: ""
            });
            this.props.history.push('/');
        })
        .catch(function(error) {
            alert(error)
            this.setState({ loading: false});
            console.error("Error adding document: ", error);
        });

      }).catch(error => {
        console.log("Error getting document:", error);
        alert('You have no access to create a project');
        this.setState({ loading: false});
      });
    }else{
      console.log('not valid');
      this.setState({ loading: false});
    }

  }
  validation = (e) => {
    let input = this.state;
    let errors = {};
    let isValid = true;

    if (!input["title"]) {
        isValid = false;
        errors["title"] = "Please enter title.";
    }
    if (!input["content"]) {
      isValid = false;
      errors["content"] = "Please enter content.";
    }

    this.setState({
        errors: errors
    });
    return isValid;
  }
  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged(userAuth => {
      this.setState({ user: userAuth});
    });
  }
  componentWillUnmount() {
      this.listener();
  }
  render() {
    const {loading,config} = this.state;
    // if(!this.state.user) return <Redirect to='/signin'></Redirect>
    const submitBtn = !loading ? <button className="btn pink lighten-1">Create</button> : <span>Please wait..</span>;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Project Title</label>
            <div style={{'color':'red'}}>{this.state.errors.title}</div>
          </div>
          <div className="input-field">
            <JoditEditor
                config={config}
                onChange={this.handleTextAreaChange}
                 />
          </div>
          <div className="input-field">
            {submitBtn}
          </div>
        </form>
      </div>
    )
  }
}

const condition = authUser => authUser != null;

export default withAuthorization(condition) (CreateProject)
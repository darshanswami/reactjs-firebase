import React, { Component } from 'react'
import { withFirebase } from '../../config';
import firebase from "firebase";

const INITIAL_STATE = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    error:'',
    loading: false
}

class SignUp extends Component {
    constructor(props) {
        super(props);
     
        this.state = { ...INITIAL_STATE };
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        this.setState({ loading: true});
        const firestore = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            // SOME OTHER CODES here
            const uid = authUser.user.uid;
            firestore.collection("users").doc(uid).set({
                uid: authUser.user.uid,
                email: email,
                firstname: firstName,
                lastname: lastName,
                created: new Date()
            });
            this.setState({...INITIAL_STATE});
            this.props.history.push("/")
         })
         .then(() => {
            // SOME OTHER CODES here
            this.setState({...INITIAL_STATE});
            this.props.history.push("/")
         })
        .catch(error => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ error:errorMessage, loading: false });
            
        });

    }
    render(){
        const {error,loading} = this.state;
        const submitBtn = !loading ? <button className="btn pink lighten-1 z-depth-0">Sign Up</button> : <span>Please wait..</span>;
        return(
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id='firstName' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id='lastName' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    {error && <div style={{'color':'red','fontSize':'20px'}}>{error}</div>}
                </div>
                <div className="input-field">
                    {submitBtn}
                </div>
                </form>
            </div>
        )
    }
}

export default withFirebase(SignUp)
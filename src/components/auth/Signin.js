import React, { Component } from 'react'
import firebase from "firebase";
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../config';
import { compose} from 'redux'

const INITIAL_STATE = {
    email: '',
    password: '',
    user:[],
    error:'',
    loading:false
}
class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE}
    }
    redirectPage(){
        console.log(this.props)
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({ loading: true});
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                // SOME OTHER CODES here
                this.setState({...INITIAL_STATE});
                this.props.history.push("/")
                // window.location.href = '/'; 
             })
             .then(() => {
                // SOME OTHER CODES here
                this.setState({...INITIAL_STATE});
                this.props.history.push("/")
             })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                
                if (errorCode === 'auth/wrong-password') {
                    this.setState({ error:'Wrong password.' });
                } else {
                    this.setState({ error:errorMessage });
                }
                this.setState({ loading: false});
            });
    }
    componentDidMount() {
        this.listener = firebase.auth().onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth});
        });
    }
    componentWillUnmount() {
        this.listener();
    }
    render(){
        const {loading} = this.state;
        const submitBtn = !loading ? <button className="btn pink lighten-1 z-depth-0">Login</button> : <span>Please wait..</span>;
        const {error} = this.state;
        return(
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={this.handleChange} />
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

const SignInForm = compose(
    withRouter,
    withFirebase,
  )(SignIn);

export default SignIn;

export { SignInForm };
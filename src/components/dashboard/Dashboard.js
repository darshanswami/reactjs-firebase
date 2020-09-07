import React, {Component} from 'react'
import ProjectList from './../projects/ProjectList'
import firebase from "firebase";

class Dashboard extends Component{
    constructor(props){
        super(props);
        // console.log(firebase.auth);
        this.ref = firebase.firestore().collection('projects');
        this.unsubscribe = null;
        this.state = {
            projects:[]
        }
        // console.log(this.state)
    }
        
    onCollectionUpdate = (querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
            const { title, content, author, created } = doc.data();
            projects.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                content,
                author,
                created
            });
        });
        this.setState({
            projects
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        firebase.auth().onAuthStateChanged(userAuth => {
            
            this.setState({ user: userAuth});
        });
    }

    render(){
        return(
            <div>
                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <br></br><br></br><br></br><br></br>
                        <div className="container">
                            <h3 style={{'position': 'absolute', 'left':'300px', 'top':'250px', 'color':'#263238','textAlign':'center'}} className="header text-lighten-2">Write Your Thoughts<br/> And <br/>Breack The Chain</h3>
                        </div>
                    </div>
                    <div className="parallax"><img src={require('../../img/20200801_191025.jpg')}  style={{'opacity': '1', 'top':'-372px'}} alt="banner"/></div>
                </div>
                <div className="dashboard container">
                    <div className="row">
                    <div className="col s12 m12">
                        <ProjectList projects={this.state.projects} />
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Dashboard)
import React from 'react'
import firebase from 'firebase'
import { withAuthorization } from '../Session';
import momment from 'moment'

class ProjectDetail extends React.Component{
    constructor(props){
        const id = props.match.params.id;
        super(props);
        this.unsubscribe = null;
        this.state = {
            id:id,
            project:[],
            isLoading: true
        }
    }
    componentDidMount() {
        const ref = firebase.firestore().collection('projects').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              project: doc.data(),
              key: doc.id,
              isLoading: false
            });
          } else {
            console.log("No such document!");
            this.setState({
                project: null,
                key: null,
                isLoading: false
            });
          }
        });
    }    

    createMarkup(content) {
        return {__html: content};
    }
    
    render(){
        if (this.state.isLoading) {
            return(
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                        <span className="card-title"> Loading.. </span>
                    </div>
                    </div>
                </div>
            )
        }
        if(this.state.project){
            return (
                <div className="container section project-details">
                    <div className="padding-zero">
                        <div className="blog-date text-font-family blog-date-padding">
                            <span className="font-weight-bold">{this.state.project.authorFirstName}</span> | {momment(this.state.project.created.toDate()).calendar()}			
                        </div>
                        <div className="header blog-title text-font-family content-space">
                            {this.state.project.title}		
                        </div>
                        <div className="description blog-description text-font-family more content-space" dangerouslySetInnerHTML={this.createMarkup(this.state.project.content)}>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                        <span className="card-title"> Not found </span>
                    </div>
                    </div>
                </div>
            )
        }
        
            
    }
}

const condition = authUser => authUser != null;
export default withAuthorization(condition) (ProjectDetail);
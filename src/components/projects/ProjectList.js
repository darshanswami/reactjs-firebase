import React from 'react'
import ProjectSummary from './ProjectSummary'
// import firebase from "firebase";

const ProjectList = ({projects}) => {

    return(
        <div className="project-list section">
            {projects && projects.map(project => {
                return (
                    <ProjectSummary project={project} key={project.key} />
                )
            })}            
        </div>
    )
}

export default ProjectList

// class ProjectList extends React.Component{
//     constructor(props){
//         super(props);
//         this.ref = firebase.firestore().collection('projects');
//         this.unsubscribe = null;
//         this.state = {
//             projects:[]
//         }
//     }
    
        
//     onCollectionUpdate = (querySnapshot) => {
//         const projects = [];
//         querySnapshot.forEach((doc) => {
//             const { title, description, author } = doc.data();
//             projects.push({
//                 key: doc.id,
//                 doc, // DocumentSnapshot
//                 title,
//                 description,
//                 author
//             });
//         });
//         this.setState({
//             projects
//         });
//     }

//     componentDidMount() {
//         this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
//     }

//     render(){
//         return (
//             <div className="project-list section">
//                 {this.state.projects && this.state.projects.map(project => {
//                     return (
//                         <ProjectSummary project={project} key={project.key} />
//                     )
//                 })}            
//             </div>
//         )
            
//     }
// }

// export default ProjectList;
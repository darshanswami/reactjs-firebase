import React from 'react'
import {Link} from 'react-router-dom'
import momment from 'moment'

const ProjectSummary = ({project}) => {

    return(
        
        <div className="">
            <div className="col s12 m6">
            <div className="card">
                <div className="card-content">
                <span className="card-title grey-text text-darken-4" style={{'fontWeight':'400'}}>{truncate(project.title, 60)}</span>
                <p className="light">{truncate(project.content, 150)}</p>
                <p className="grey-text">{project.created && momment(project.created.toDate()).calendar()}</p>
                </div>
                <div className="card-action">
                    <Link className="btn waves-effect waves-light" to={`/project/${project.key}`}>Read more<i className="material-icons right">send</i></Link>
                </div>
            </div>
            </div>
        </div>
    )
}
    
const truncate = (str, length) =>{
    if(str.length > length)
        return str.length > 10 ? str.substring(0, length) + "..." : str;
    else
        return str;
}

export default ProjectSummary
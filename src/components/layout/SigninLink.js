import React from 'react'
import {NavLink} from 'react-router-dom'
import { withFirebase } from '../../config';

const SigninLink = ({firebase}) => {
    
    return(
        <ul className='right'>
            <li>
                <NavLink to='/create-project'>Create Project</NavLink>
            </li>
            <li>
                <a href="#" onClick = {firebase.doSignOut}>Sign Out</a>
            </li>
        </ul>
    )
}

export default withFirebase(SigninLink);
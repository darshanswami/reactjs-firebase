import React from 'react'
import {Link} from 'react-router-dom'
import SigninLink from './SigninLink'
import SignoutLink from './SignoutLink'
import { AuthUserContext } from '../Session';
import { withFirebase } from '../../config';

const Navbar = () => {
    // const {auth} = props;
    // const link = (!authUser) ? <SignoutLink></SignoutLink> : <SigninLink></SigninLink>;
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo1"><img src={require('../../img/logo-220x200.png')} alt="Bloggy"/></Link>
                
                <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? <SigninLink /> : <SignoutLink />
                }
                </AuthUserContext.Consumer>
            </div>
        </nav>
    )
}

export default withFirebase(Navbar)
// export default connect(mapStateToProper)(Navbar)
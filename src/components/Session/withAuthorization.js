import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../config';
import {compose} from 'redux'
import { AuthUserContext } from '../Session';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
      componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            if (!condition(authUser)) {
              this.props.history.push('/signin');
            }
          },
        );
      }
   
      componentWillUnmount() {
        this.listener();
      }
   
      render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => condition(authUser) ? <Component {...this.props} /> : null}
            </AuthUserContext.Consumer>
        );
      }
    }
   
    return compose(
      withRouter,
      withFirebase,
    )(WithAuthorization);
  };
   
  export default withAuthorization;
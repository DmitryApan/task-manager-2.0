import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signOut} from './store/actionsCreators/authorization';

function LogOut(props) {
    props.signOut();

    return (
        <Redirect to="/login" />
    )
}

const actionsCreators = {signOut};

export default connect(null, actionsCreators)(LogOut);
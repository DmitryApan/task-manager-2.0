import {
    AUTHORIZATION_REQUEST, 
    AUTHORIZATION_ERROR, 
    AUTHORIZATION_LOGIN, 
    AUTHORIZATION_LOGOUT
} from '../actions/authorization';
import {
    backendSignIn, 
    backendSignUp, 
    backendGetUserInfo, 
    backendGetSettings,  
    backendGetDataCards,
    backendGetUsersAppData,
    backendGetAuth,
    backendSignOut
} from '../../networkFunctions';
import {userInfoRequest, userInfoReceive} from '../actionsCreators/userInfo';
import {settingsRequest, settingsReceive} from '../actionsCreators/settings';
import {cardsRequest, cardsReceive} from '../actionsCreators/cards';
import {usersAppRequest, usersAppReceive} from '../actionsCreators/usersApp';

function authorizationRequest() {
    return {type: AUTHORIZATION_REQUEST}
}

function authorizationLogIn() {
    return {type: AUTHORIZATION_LOGIN}
}

function authorizationLogOut() {
    return {type: AUTHORIZATION_LOGOUT}
}

function authorizationError(error) {
    return {type: AUTHORIZATION_ERROR, error}
}

function asyncGetAppData() {
    return dispatch => {     
        dispatch(userInfoRequest());
        
        backendGetUserInfo().then((userInfo) => {
            dispatch(userInfoReceive(userInfo));
            dispatch(settingsRequest());

            return backendGetSettings();
        }).then((settings) => {
            dispatch(settingsReceive(settings));
            dispatch(cardsRequest());

            return backendGetDataCards();
        }).then((cards) => {
            dispatch(cardsReceive(cards));
            dispatch(usersAppRequest());

            return backendGetUsersAppData();
        }).then((usersApp) => {
            dispatch(usersAppReceive(usersApp));                
        });
    }    
}

export function authorization() {
    return dispatch => {
        dispatch(authorizationRequest());

        backendGetAuth().then(res => {
            if (res.data.id) {
                dispatch(authorizationLogIn());
                dispatch(asyncGetAppData());
            }
            else {
                dispatch(authorizationError());
            }
        });        
    }
}

function getFunctionSign(sign) {
    return (email, password) => {
        return dispatch => {
            sign({email, password}).then(res => {
                if (res.data.id) {                   
                    dispatch(authorization());
                }
                else {
                    dispatch(authorizationError(res.error));
                }            
            });
        } 
    }
}

export function signIn(email, password) {
    return dispatch => {
        dispatch(getFunctionSign(backendSignIn)(email, password));
    }
}

export function signUp(email, password) {
    return dispatch => {
        dispatch(getFunctionSign(backendSignUp)(email, password));
    }
}

export function signOut() {
    return dispatch => {
        backendSignOut().then(res => {
            if (res.data.id) {
                dispatch(authorizationLogOut());
            }
        });        
    }
}
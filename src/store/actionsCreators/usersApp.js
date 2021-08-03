import {USERS_APP_REQUEST, USERS_APP_RECEIVE, USERS_APP_DATA_CHANGE} from '../actions/usersApp';

export function usersAppRequest() {
    return {
        type: USERS_APP_REQUEST
    }
}

export function usersAppReceive(usersApp) {
    return {
        type: USERS_APP_RECEIVE,
        usersApp
    }
}

export function usersAppChange(usersApp) {
    return {
        type: USERS_APP_DATA_CHANGE,
        usersApp
    }
}
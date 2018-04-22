import {SAVE_FILE, LOAD_FILES, SELECT_PROJECT, USER_LOGIN} from './actions'

export const initialState = {
  // List of files currently known about
  user: null,
  error: false,
  loading: false,
  project: false,
  files: []
}

export function draftApp(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign(initialState, {
        user: action.user
      });
    case SAVE_FILE:
      return Object.assign({}, state, {
        loading: true,
        files: []
      })
    case LOAD_FILES:
      console.log('load files')
      return Object.assign({}, state, {
        loading: false,
        files: action.files
      })
    case SELECT_PROJECT:
      if (state.user) {
        return Object.assign({}, state, {
          project: action.project,
          files: []
        });
      } else {
        return state;
      }
    default:
      console.info('unhandled action', action.type, JSON.stringify(action))
      return state
  }
}


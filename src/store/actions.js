import { getProjectFiles } from "../services/projects";

export const LOAD_FILES = 'LOAD_FILES';
export const SAVE_FILE = 'SAVE_FILE';
export const SELECT_PROJECT = 'SELECT_PROJECT'
export const USER_LOGIN = 'USER_LOGIN';

export const selectProject = (project) => ({type: SELECT_PROJECT, project})

export const loadFiles = (files) => ({
  type: LOAD_FILES,
  files
});

export const saveFile = (id, file) => ({
  type: SAVE_FILE,
  project: id,
  file: file
});

export const userLogin = user => ({
  type: USER_LOGIN,
  user
})

export const fetchFiles = (user, project) => dispatch => {
  dispatch(selectProject(project))
  return getProjectFiles(user, project)
    .then(files => {
      dispatch(loadFiles(files))
    })

}
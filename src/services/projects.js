import firebase from 'firebase';
import 'process';

export const BASE_URL = 'https://api.ersin.nz/'
// export const BASE_URL = 'http://localhost:1338/'

const apiOptions = (tok, method, body) => ({
    body: JSON.stringify(body),
    method: method || 'GET',
    headers: {
      'Authorization': tok,
      'Content-Type': 'application/json'
    }
  });

export function getProjects(user) {
  const url = BASE_URL + 'projects'
  if (user) {
    return user.getIdToken()
      .then(tok => {
        return fetch(url, apiOptions(tok))
        .then(r => r.json())
      })
  } else {
    return Promise.reject(new Error('USER NOT LoGGED IN'))   
  }
}

export function getProjectFiles(user, project) {
  if (!firebase.auth().currentUser || !project) {
    return Promise.reject(new Error('must have user and project params'))
  }
  return firebase.auth().currentUser.getIdToken()
    .then(tok => {
      return fetch(BASE_URL + `projects/${project}/files`, apiOptions(tok))
        .then(r => r.json())
    })
}

export function saveFile(project, name, content) {
  if (!firebase.auth().currentUser || !project || !name || !content) {
    return Promise.reject(new Error('must have user and project params'))
  }
  return firebase.auth().currentUser.getIdToken()
    .then(tok => {
      return fetch(BASE_URL + `projects/${project}/new`, apiOptions(tok, 'POST', {name, content}))
    })
    .then(r => r.json())
}
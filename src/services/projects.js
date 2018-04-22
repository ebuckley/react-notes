import firebase from 'firebase';

export const BASE_URL = 'https://api.ersin.nz/'
// export const BASE_URL = 'http://localhost:1338/'

export function getProjects(user) {
  const url = BASE_URL + 'projects'
  if (user) {
    return user.getIdToken()
      .then(tok => {
        return fetch(url, {
          headers: {
            'Authorization': tok
          }
        })
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
      return fetch(BASE_URL + `projects/${project}/files`, {headers: {Authorization: tok}})
        .then(r => r.json())
    })
}
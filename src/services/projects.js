
export const BASE_URL = 'https://api.ersin.nz/'

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
  if (!user || !project) {
    return Promise.reject(new Error('must have user and project params'))
  }
  return user.getIdToken()
    .then(tok => {
      return fetch(BASE_URL + `projects/${project}/files`, {headers: {Authorization: tok}})
        .then(r => r.json())
    })
}
import http from './httpService'
import jwtDecode from 'jwt-decode'

function saveJwt({ token, refreshToken }) {
  localStorage.setItem('access-token', token)
  localStorage.setItem('refresh-token', refreshToken)
}

async function login(user) {
  return await http.post('/auth/login', { user }).then(data => {
    saveJwt(data.data.jwt)
    localStorage.setItem('log-id', data.data.logId)
  })
}

async function signUp(user) {
  const { jwt } = await http.post('/auth/sign-up', user).then(data => data.data)

  // if (!jwt) return false

  // saveJwt(jwt)
  // return true
  return false
}
function logout() {
  http.sendJwt(jwt())

  const logId = localStorage.getItem('log-id')

  http
    .post('/auth/logout', { logId })
    .then(() => {
      removeTokens()
      window.location.href = window.location.origin
    })
    .catch(() => {
      removeTokens()
      window.location.href = window.location.origin
    })
}

function removeTokens() {
  localStorage.removeItem('refresh-token')
  localStorage.removeItem('access-token')
  localStorage.removeItem('log-id')
}

function getDecodeToken() {
  try {
    const token = localStorage.getItem('access-token')
    return { ...jwtDecode(token) }
  } catch (ex) {
    return null
  }
}

const getCurrentUser = () =>
  getDecodeToken() ? { ...getDecodeToken().data } : null

const isValidUser = () => (getDecodeToken() ? true : false)

const isAdminOrManager = () => {
  const position = getDecodeToken().data.position

  return position === 'manager' || position === 'admin' || position === 'super'
}

const isPromo = () => {
  const position = getDecodeToken().data.position
  return position === 'promo'
}

const isAdmin = () => {
  const position = getDecodeToken().data.position

  return position === 'admin' || position === 'super'
}

const isSuper = () => {
  const position = getDecodeToken().data.position

  return position === 'super'
}

function isUsernameTaken(username) {
  return http.get('/auth/is-taken?username=' + username).then(data => data.data)
}

function isCodeNoTaken(codeNo) {
  return http
    .get('/auth/is-codeno-taken?codeNo=' + codeNo)
    .then(data => data.data)
}

function isEmailTaken(email) {
  return http.get('/auth/is-taken?email=' + email).then(data => data.data)
}

const jwt = () => {
  return {
    token: localStorage.getItem('access-token'),
    refreshToken: localStorage.getItem('refresh-token')
  }
}

export default {
  login,
  signUp,
  logout,
  getCurrentUser,
  isUsernameTaken,
  isEmailTaken,
  jwt,
  isValidUser,
  isAdmin,
  isAdminOrManager,
  isPromo,
  isCodeNoTaken
}

import http from './httpService'
import auth from './authService'
import { mapToSelect } from './utilsService'

export function addClient(client) {
  return http.post('/api/clients', client).then(data => data.data)
}

export function getStatus() {
  http.sendJwt(auth.jwt())
  return http.get('/api/clients/status').then(data => data.data)
}

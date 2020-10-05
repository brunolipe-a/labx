import axios from 'axios'

export type ApiFieldError = {
  message: string
  field: string
}
const urls = {
  test: 'http://localhost:3334',
  development: 'http://localhost:3333/',
  production: 'https://your-production-url.com/'
}
const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export { api }

function getToken(key = 'token') {
  return localStorage.getItem(key)
}
export { getToken }

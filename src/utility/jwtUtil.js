// Utility function to parse the JWT and check if it's expired
export function isTokenExpired(token) {
    if (!token) return true

    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(window.atob(base64))

    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime // True if token is expired
}

import jwt from 'jsonwebtoken'

export const requireAuthWs = (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    if (!token) throw new Error('Token missing')
    const payload = jwt.verify(token, process.env.JWT_KEY)
    socket.userId = payload.id
    next()
  } catch (error) {
    console.log({ erro: error.message })
  }
}

import jwt from 'jsonwebtoken'

export const requireToken = (req, res) => {
  try {
    const barerToken = req.headers.authorization
    const token = barerToken.split(' ').at(-1)

    if (!token) throw new Error('token missing')
    const payload = jwt.verify(token, process.env.JWT_KEY)

    // Una vez validado al usuario
    // Agregamos el userId al req
    req.userId = payload.userId
  } catch (error) {}
}

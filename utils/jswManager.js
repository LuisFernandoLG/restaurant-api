import jwt from 'jsonwebtoken'

export const generateToken = ({ userId }) => {
  const expiresIn = 360 * 60 *60
  try {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn })
    return { token, expiresIn }
  } catch (error) {
    console.log({ error })
  }
}

export const generateRefreshToken = (userId, res) => {
  const expiresIn = 60 * 60 * 24 * 30

  try {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_KEY, {
      expiresIn,
    })

    res.cookie('refreshToken', token, {
      secure: process.env.MODE !== 'dev',
      httpOnly: true,
      expireIn: new Date(Date.now() + expiresIn * 1000),
    })
  } catch (error) {
    console.log({ error })
  }
}

const verifyToken = ({ token }) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY)
    return payload
  } catch (error) {
    console.log({ error })
  }
}

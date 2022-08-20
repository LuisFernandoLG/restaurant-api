import { User } from '../models/User.js'
import { generateRefreshToken, generateToken } from '../utils/jswManager.js'


export const login = async (req, res) => {
  const { userName, password } = req.body
  try {
    // No guardar la contraseña plana
    const user = await User.find({userName, password})
    if(!user) throw new Error("password or user incorrect")
    return res.json({ success, user })
  } catch (error) {
    res.status(404).json({ success: true, error: error.message })
  }
}

export const registerWaiter = async (req, res) => {
  const { name, userName, password, image, isActive } = req.body
  const userTypeWaiter = '62fc575b0938fd89e62a18ad'
  try {
    let user = User.find({ userName })
    if (!user) throw new Error('user already exists!')

    user = new User({
      name,
      userName,
      password,
      image,
      isActive,
      userType: userTypeWaiter,
    })

    await user.save()
    res.status(201).json({ success: true, user })
  } catch (error) {
    res.status(404).json({ success: true, error: error.message })
  }
}


export const registerCooker = async (req, res) => {
  const { name, userName, password, image, isActive } = req.body
  const userTypeWaiter = '62fc575b0938fd89e62a18ae'
  try {
    let user = User.find({ userName })
    if (!user) throw new Error('user already exists!')

    user = await new User({
      name,
      userName,
      password,
      image,
      isActive,
      userType: userTypeWaiter,
    })

    await user.save()
    res.status(201).json({ success: true, user })
  } catch (error) {
    res.status(404).json({ success: true, error: error.message })
  }
}



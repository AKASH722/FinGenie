import jwt from 'jsonwebtoken'
import { getUserByCognitoId } from '../dao/user.dao.js'

export const authMiddleware = () => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    try {
      const decoded = jwt.decode(token)
      const cognitoUserId = decoded.sub

      const user = await getUserByCognitoId(cognitoUserId)
      if (!user) {
        res.status(404).json({ message: 'Not Found' })
        return
      }

      req.user = user
    } catch (err) {
      console.error('Failed to decode token:', err)
      res.status(400).json({ message: 'Invalid token' })
      return
    }

    next()
  }
}

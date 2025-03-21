import * as userDao from '../dao/user.dao.js'

/**
 * Handles user creation.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const user = await userDao.createUser(userData)
    return res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

/**
 * Handles fetching a user by ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const getUser = async (req, res, next) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    next(error)
  }
}

/**
 * Handles updating a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const updateUser = async (req, res, next) => {
  try {
    const id = req.user.id

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const updatedUser = await userDao.updateUser(id, req.body)
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

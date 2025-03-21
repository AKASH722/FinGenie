import { Router } from 'express'
import * as userController from '../controller/user.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * Route to create a new user.
 *
 * @route POST /users
 * @access Public
 * @controller userController.createUser
 */
router.route('/').post(userController.createUser)

/**
 * Route to get a user by ID.
 *
 * @route GET /users/:id
 * @access Public
 * @controller userController.getUser
 */
router.route('/').get(authMiddleware(), userController.getUser)

/**
 * Route to update a user.
 *
 * @route PUT /users/:id
 * @access Public
 * @controller userController.updateUser
 */
router.route('/').put(authMiddleware(), userController.updateUser)

export default router

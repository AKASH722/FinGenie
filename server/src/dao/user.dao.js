import { PrismaClient } from '@prisma/client'

const userClient = new PrismaClient().user

/**
 * Create a new user.
 *
 * @param {Object} userData - Data to create the user.
 * @returns {Promise<Object>} The created user.
 */
export const createUser = async (userData) => {
  return userClient.create({
    data: userData,
  })
}

/**
 * Get a user by their ID.
 *
 * @param {String} userId - The ID of the user.
 * @returns {Promise<Object|null>} The user if found, otherwise null.
 */
export const getUserById = async (userId) => {
  return userClient.findUnique({
    where: {
      id: userId,
    },
  })
}

/**
 * Get a user by their Cognito User ID.
 *
 * @param {String} cognitoUserId - The Cognito User ID.
 * @returns {Promise<Object|null>} The user if found, otherwise null.
 */
export const getUserByCognitoId = async (cognitoUserId) => {
  return userClient.findUnique({
    where: {
      cognitoUserId,
    },
  })
}

/**
 * Update user data.
 *
 * @param {String} userId - The ID of the user to update.
 * @param {Object} userData - The updated user data.
 * @returns {Promise<Object>} The updated user.
 */
export const updateUser = async (userId, userData) => {
  return userClient.update({
    where: {
      id: userId,
    },
    data: userData,
  })
}

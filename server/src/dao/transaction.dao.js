import { PrismaClient } from '@prisma/client'

const transactionClient = new PrismaClient().transaction

/**
 * Create a new transaction for a user.
 *
 * @param {String} userId - The ID of the user.
 * @param {Object} transactionData - The data of the transaction to create.
 * @returns {Promise<Object>} The created transaction.
 */
export const createTransaction = async (userId, transactionData) => {
  return transactionClient.create({
    data: {
      userId,
      ...transactionData,
    },
  })
}

/**
 * Update an existing transaction.
 *
 * @param {String} transactionId - The ID of the transaction to update.
 * @param {Object} transactionData - The new data for the transaction.
 * @returns {Promise<Object>} The updated transaction.
 */
export const updateTransaction = async (transactionId, transactionData) => {
  return transactionClient.update({
    where: {
      id: transactionId,
    },
    data: transactionData,
  })
}

/**
 * Delete a transaction.
 *
 * @param {String} transactionId - The ID of the transaction to delete.
 * @returns {Promise<Object>} The deleted transaction.
 */
export const deleteTransaction = async (transactionId) => {
  return transactionClient.delete({
    where: {
      id: transactionId,
    },
  })
}

/**
 * Get all transactions for a user.
 *
 * @param {String} userId - The ID of the user.
 * @returns {Promise<Array>} An array of transactions.
 */
export const getAllTransactions = async (userId) => {
  return transactionClient.findMany({
    where: {
      userId,
    },
  })
}

/**
 * Get monthly income vs. expense summary for a user.
 *
 * @param {String} userId - The ID of the user to fetch transactions for.
 * @returns {Promise<Array>} An array containing income vs. expense per month.
 */
export const getTransactionSummary = async (userId) => {
  return transactionClient.findMany({
    where: { userId },
    select: {
      amount: true,
      type: true,
      date: true,
    },
  })
}

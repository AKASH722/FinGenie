import * as transactionDao from '../dao/transaction.dao.js'

/**
 * Handles transaction creation.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const createTransaction = async (req, res, next) => {
  try {
    const transactionData = req.body
    const userId = req.user.id

    const transaction = await transactionDao.createTransaction(
      userId,
      transactionData
    )
    return res.status(201).json(transaction)
  } catch (error) {
    next(error)
  }
}

/**
 * Handles transaction update.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Transaction ID is required' })
    }

    const transaction = await transactionDao.updateTransaction(id, req.body)
    return res.status(200).json(transaction)
  } catch (error) {
    next(error)
  }
}

/**
 * Handles transaction deletion.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Transaction ID is required' })
    }

    await transactionDao.deleteTransaction(id)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

/**
 * Handles fetching all transactions for a user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const transactions = await transactionDao.getAllTransactions(userId)
    return res.status(200).json(transactions)
  } catch (error) {
    next(error)
  }
}

/**
 * Get income vs. expense summary by month.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<any>} JSON response containing monthly income and expense summary.
 */
export const getTransactionSummary = async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log('User ID:', userId) // Debugging line

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const transactions = await transactionDao.getTransactionSummary(userId)
    // Group transactions by month
    const summary = transactions.reduce((acc, txn) => {
      const month = new Date(txn.date).toLocaleString('default', {
        month: 'long',
      })

      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 }
      }

      if (txn.type === 'INCOME') {
        acc[month].income += Number(txn.amount)
      } else {
        acc[month].expense += Number(txn.amount)
      }

      return acc
    }, {})

    return res.status(200).json(Object.values(summary))
  } catch (error) {
    next(error)
  }
}

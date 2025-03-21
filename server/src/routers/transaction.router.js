import { Router } from 'express'
import * as transactionController from '../controller/transaction.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.use(authMiddleware())

// Apply authentication middleware to all routes in this router
/**
 * Route to create a new transaction.
 *
 * @route POST /transactions
 * @access Public
 * @controller transactionController.createTransaction
 */
router.route('/').post(transactionController.createTransaction)

/**
 * Route to update a transaction.
 *
 * @route PUT /transactions/:id
 * @access Public
 * @controller transactionController.updateTransaction
 */
router.route('/:id').put(transactionController.updateTransaction)

/**
 * Route to delete a transaction.
 *
 * @route DELETE /transactions/:id
 * @access Public
 * @controller transactionController.deleteTransaction
 */
router.route('/:id').delete(transactionController.deleteTransaction)

/**
 * Route to get all transactions for a user.
 *
 * @route GET /transactions
 * @access Public
 * @controller transactionController.getAllTransactions
 */
router.route('/').get(transactionController.getAllTransactions)

/**
 * Route to get income vs. expense summary by month.
 *
 * @route GET /transactions/summary
 * @access Private
 * @controller transactionController.getTransactionSummary
 */
router.route('/summary').get(transactionController.getTransactionSummary)

export default router

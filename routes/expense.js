const express=require('express');
const expenseController=require('../controllers/expensecont');

const router=express.Router();

router.get('/add-expense',expenseController.homepage);

router.post('/add-expense',expenseController.addExpense);

router.get('/expenses/load-data',expenseController.sendExpenses);

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense);

router.put('/edit-expense/:expenseId',expenseController.editExpense);
router.get('/edit-expense/:expenseId',expenseController.getEditExpense);

module.exports=router;
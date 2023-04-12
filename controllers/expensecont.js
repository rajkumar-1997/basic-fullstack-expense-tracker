const path=require('path');
const ExpenseData=require('../models/expense');
const rootDir=require('../util/path.js');

exports.homepage=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','index.html'));

}

exports.addExpense=async (req,res,next)=>{
    const amount=req.body.amount;
    const category=req.body.category;
    const description=req.body.description;
    try{

        
        let result= await ExpenseData.create({amount:amount,category:category,description:description})
        
             console.log('expense added',result);
             res.send(result);
    }
    catch(err){
        console.log(err);
    }
}

exports.sendExpenses=async (req,res,next)=>{
    try{

        let expenses = await ExpenseData.findAll()
             console.log(expenses);
             res.send(expenses);
    }
    catch(err){
        console.log(err,'Got some error')
       
    }
}


exports.deleteExpense= async (req,res,next)=>{
    const expenseId=req.params.expenseId;

 try{

     let expense = await  ExpenseData.findByPk(expenseId)
          console.log('expense deleted');
          let result = await expense.destroy();
     
          console.log(result);
          res.send();
 }
   catch(err){
        console.log(err);
    }
}

exports.getEditExpense= async (req,res,next)=>{
    const expenseId=req.params.expenseId;
   try{

       let expense = await ExpenseData.findByPk(expenseId)
            console.log(expense);
            res.send(expense);
   }
    catch(err){
        console.log(err);
    }
}

exports.editExpense= async (req,res,next)=>{
    const expenseId=req.params.expenseId;
    const updatedAmount=req.body.amount;
    const updatedCategory=req.body.category;
    const updatedDescription=req.body.description;
try{

    let expense = await ExpenseData.findByPk(expenseId)
         expense.amount=updatedAmount;
         expense.category=updatedCategory;
         expense.description=updatedDescription;
         console.log(expense);
          let result= await  expense.save();
         
             console.log(result);
             res.send();
         
}
    catch(err){
        console.log(err);
    }
}
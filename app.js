const express=require('express');
const bodyParser = require('body-parser');
const expenseRoutes=require('./routes/expense');
const cors=require('cors');
const path=require('path');
const sequelize=require('./util/database');

const app=express();
app.use(express.static(path.join(__dirname,'public')));

app.use(cors());

app.use(bodyParser.json({extended:false}));

app.use(expenseRoutes);


sequelize.sync().then(result=>{
    console.log(result);
    app.listen(3000);

}).catch(err=>{
    console.log(err);
})
const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const ExpenseData = sequelize.define('texpenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },

    amount:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    category:{
        type:Sequelize.STRING,
        allowNull:false,
        
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        
    }

});

module.exports=ExpenseData;
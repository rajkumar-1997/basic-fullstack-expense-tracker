

let amountInput=document.getElementById('amount');
let categoryInput=document.getElementById('category');
let descriptionInput=document.getElementById('description');
let adddata=document.getElementById('adddata');
// let updatebtn=document.getElementsById('updatedata');
let msj=document.getElementsByClassName(' .msg');
let updatedata=document.getElementById('updatedata');
let heading=document.querySelector('.form-box h3')



const saveData= async(e)=>{
    e.preventDefault();
    
    if(amountInput.value=="" || categoryInput.value ==""  || categoryInput.value == "Choose Category" || descriptionInput.value ==""   )
    {
        
        window.alert('Please Enter All fields');
    }

    else{

        let obj={
            amount:amountInput.value,
            category:categoryInput.value,
            description:descriptionInput.value,
    
        }
        try{

            let response= await axios.post('http://localhost:3000/add-expense',obj)
             
                 console.log(response);
                 showDataOnScreen(response.data);
        }
        catch(err){
            console.log(err);
        }
        msj.textContent=""
    }
}

adddata.addEventListener('click',saveData);

window.addEventListener('DOMContentLoaded',async ()=>{

    try{

       let response= await axios.get('http://localhost:3000/expenses/load-data')
       
            console.log(response.data);
            for(let i=0;i<response.data.length;i++){
                showDataOnScreen(response.data[i]);
            }
    }
    catch(err){
        console.log(err);
    }
    
})


function showDataOnScreen(obj){
    let parent=document.getElementById('tablebody');
    let childHTML=` <tr  id=${obj.id}>
                 
    <td>${obj.amount}</td>
    <td>${obj.category}</td>
    <td>${obj.description}</td>
    <td><button class="deletebtn" id="deletenow" onClick=deleteData(${obj.id})>Delete</button><button  id='${obj.id}' class="editbtn" onClick=editData(${obj.id})>Edit</button></td>
    
    </tr>`;
    parent.innerHTML+=childHTML;
    amountInput.value="";
    categoryInput.value="Choose Category";
    descriptionInput.value="";
}

 async function deleteData(id){
   
    try{

        let response= await axios.delete(`http://localhost:3000/delete-expense/${id}`)
        
            console.log(response);
           
                removeDataFromScreen(id);
    }
       
    catch(err){
        console.log(err);
    }
}

function removeDataFromScreen(id){

    let parent=document.getElementById('tablebody')
    let childNodeToBeDeleted=document.getElementById(id);
    parent.removeChild(childNodeToBeDeleted);
}


 async function editData(id){
    let Id=id;
    updatedata.style.display='block';
    adddata.style.display='none';
    updatedata.value=id;

    try{

        let response= await axios.get(`http://localhost:3000/edit-expense/${id}`)
         
             console.log(response.data);
             amountInput.value=response.data.amount;
             categoryInput.value=response.data.category;
             descriptionInput.value=response.data.description;
             
     
             heading.innerHTML="Edit Expense";
    }
    catch(err){
        console.log(err);
    }
    
}



updatedata.addEventListener('click',finalEdit= async (e)=>{
    e.preventDefault();
    let id=updatedata.value;
        let amt=amountInput.value;
        let cat=categoryInput.value;
        let des=descriptionInput.value;
    if(amt=="" || cat ==""  || cat== "Choose Category" || des ==""   )
    {
        
        window.alert('Please Enter All fields');
    }

    else{
       
    
        let lol={
            amount:amt,
            category:cat,
            description:des,
        }

        try{

            let response=   await axios.put(`http://localhost:3000/edit-expense/${id}`,lol)
              
                   console.log(response);
                  
                 document.getElementById(id).children[0].textContent=amt;;
                 document.getElementById(id).children[1].textContent=cat;
                 document.getElementById(id).children[2].textContent=des;
                 
                   updatedata.style.display='none';
                   adddata.style.display='block';
                   updatedata.value="";
                   amountInput.value="";
                   categoryInput.value="Choose Category";
                   descriptionInput.value="";
                   heading.innerHTML="Add Your Expense";
        }
    

        catch(err){
            console.log(err);
        }
    
    }
    
})
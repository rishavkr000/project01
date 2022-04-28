const authorModel=require('../model/authorModel')
var validator = require('validator');


//=========== Create Authors ====================//


//------------validation function-----------//
let isValid= (value)=>{
  if (typeof value === 'undefined' ||  value === null) return false
  if(typeof value === 'string' && value.trim().length ===0) return false
  return true;
}



const createAuthor = async (req,res)=>{
  try{ 
    let data = req.body;
    
 if (Object.keys(data).length == 0 ){
 return res.status(401).send({status:false ,msg:"BAD REQUEST,Please provide Author details "});
}
if (!isValid(data.fname)){
  return res.status(400).send({status:false ,msg:"First Name is Required"});
}
if (!isValid(data.lname)){
  return res.status(400).send({status:false ,msg:"Last Name is Required"});
}
if (!isValid(data.title)){
  return res.status(400).send({status:false ,msg:"title is Required"});
}
if (!isValid(data.email)){
  return res.status(400).send({status:false ,msg:"email is mandatory"});
}
if (!isValid(data.password)){
  return res.status(400).send({status:false ,msg:"password is mandatory"});
}
if (!validator.isEmail(data.email)){
  return res.status(400).send({status:false ,msg:"Enter a Valid Email"});
}

const usedEmail = await authorModel.findOne({email:data.email})

if (usedEmail){
  return res.status(400).send({status:false ,message: `${data.email} this email is already registered`})
}
let savedData = await authorModel.create(data)
   res.status(201).send({status:true , msg:savedData});

  }
  catch(error){
      console.log("This is the error:",error.message );
      res.status(500).send({status:false , msg:error.message});
  }
}
module.exports.createAuthor=createAuthor



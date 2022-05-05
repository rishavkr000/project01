const { isValidObjectId } = require("mongoose");
const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const { isValidRequestBody, isValid, isValidEmail, isValidMobile } = require("./validator");

let createIntern= async function(req,res){
    try{
        let data=req.body;
        console.table(data)
        if(!isValidRequestBody(data)) return res.status(400).send({status:false,msg: "No user input"})
        let {name, email, mobile, collegeId} =data;

        if(!isValid(name))  return res.status(400).send({status:false,msg: "Name is required"})
        if(!isValid(email))  return res.status(400).send({status:false,msg: "Email is required"})
        if(!isValidEmail(email))  return res.status(400).send({status:false,msg: `${email} is not a valid email`})

        const isUniqueEmail = await internModel.findOne({email: email})  //For checking duplicate email id
            if (isUniqueEmail)
                return res.status(400).send({status:false ,message: `This email ${email} is already registered`})
            
        if(!isValid(mobile))  return res.status(400).send({status:false,msg: "Mobile is required"})
        if(!isValidMobile(mobile))  return res.status(400).send({status:false, msg: `${mobile} is not a valid mobile number`})

        const isUniqueMobile = await internModel.findOne({mobile: mobile})
            if (isUniqueMobile)
                return res.status(400).send({status: false, message: `This mobile number ${mobile} is already exist`})

        if(!isValid(collegeId))  return res.status(400).send({status:false,msg: "College Id is required"})
        if(!isValidObjectId(collegeId))  return res.status(400).send({status:false,msg: `${collegeId} is not a valid object id`})

        let internData = {name,email,mobile,collegeId}
        const saveData= await internModel.create(internData);

        return res.status(201).send({status:true, msg: "Intern data saved sucessfully", data:saveData})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.messsage})
    }
}


let getCollegeDetails = async (req, res) => {
    try {
        const collegeName = req.query.name;
        if (!collegeName) return res.status(400).send({ status: false, msg: 'Empty query' })

        const college = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!college) return res.status(404).send({ status: false, message: "College not available" })
       
        const { name, fullName, logoLink } = college

        const internDetails = await internModel.find({ collegeId: college._id, isDeleted: false }).select({ "_id": 1, "name": 1, "email": 1, "mobile": 1 })
        console.table(internDetails)
        const data = { name: name, fullName: fullName, logoLink: logoLink, interests: internDetails }
        console.table(data)
        return res.status(201).send({ status: true, data: data })
    }
    catch(err) {
        return res.status(500).send({status: false, msg: err.message})
    } 
}



module.exports.createIntern=createIntern;
module.exports.getCollegeDetails=getCollegeDetails


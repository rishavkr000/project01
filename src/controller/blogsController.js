const blogsModel =require('../model/blogsModel')
const authorModel = require('../model/authorModel')



//------------validation function-----------//
let isValid= (value)=>{
    if (typeof value === 'undefined' ||  value === null) return false
    if(typeof value === 'string' && value.trim().length ===0) return false
    return true;
}



const blogs = async (req,res)=>{
  try{ 
      
    let blogData = req.body;
    let author = await authorModel.findById(blogData.authorId)
    if(!author){ return res.send("msg: Invalid Author Id")}
    if (Object.keys(blogData).length == 0 ){
        res.status(400).send({status:false ,msg:"BAD REQUEST, Please provide blog details "});
        return;
    }
    if (!isValid(blogData.title)){
      return  res.status(400).send({status:false,msg:"title is required"});
    }
    if (!isValid(blogData.body)){
        return res.status(400).send({status:false,msg:"body is required"});
    }
    if (!isValid(blogData.authorId)){
        return res.status(400).send({status:false,msg:"authorId is required"});
    }
    if (!isValid(blogData.category)){
        return res.status(400).send({status:false,msg:"category is required"});
    }
    if (!isValid(blogData.category)){
        return res.status(400).send({status:false,msg:"category is required"});
    }
    let savedBlogData = await blogsModel.create(blogData)
        return res.status(201).send({status:true , msg:savedBlogData});

  }
  catch(error){
      console.log("This is the error:",error.message );
      return res.status(500).send({status:false , msg: error.message});
  }
}
module.exports.blogs = blogs
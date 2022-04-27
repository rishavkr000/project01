const authorModel=require('../model/authorModel')
const blogsModel=require('../model/blogsModel')


let getActiveBlogs=async function(req,res){
    try{
    let blogs=await blogsModel.find({isDeleted:false}&&{isPublihed:true});
    if (!blogs)
    {res.status(404).send({status:false,
        msg:"No such blog eists"
    })
}
    res.status(200).send({status:true,
        data:blogs})
    } 
    catch(err){ res.status(500).send({status:false,msg:err.message})

}
}
let getSelectiveBlogs=async function(req,res){
    try{
        let data=req.query
    let blogs=await blogsModel.find(data);
    if (!blogs)
    {res.status(404).send({status:false,
        msg:"No such blog eists"
    })
}
    res.status(200).send({status:true,
        data:blogs})
    } 
    catch(err){ res.status(500).send({status:false,msg:err.message})

}
}


module.exports.getActiveBlogs=getActiveBlogs
module.exports.getSelectiveBlogs=getSelectiveBlogs
const authorModel=require('../model/authorModel')
// const authorModel=require('../model/authorModel')
const blogsModel=require('../model/blogsModel')


let getActiveBlogs=async function(req,res){
    try{
    let blogs=await blogsModel.find({isDeleted:false,isPublihed:true});
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

let getBlog=async function(req,res){
    try{
    let blogs=await blogsModel.find();
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
    let blogs=await blogsModel.find({data});
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





// Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

const deletBlog = async function (req, res) {


    let blogId = req.params.blogId;
    let blog = await blogsModel.findById(blogId);
    if (!blog) {
        return res.status(404).send({ status: false, msg: "blogId not found" })
    }
    let deletedBlog = await blogsModel.updateMany({_id: blogId },{isDeleted: true,deletedAt:new Date().toLocaleString()},{new:true});
    res.status(200).send({ data:deletedBlog ,status:true })

}

//Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

const delBlogsByQuery = async function (req, res) {
    let category = req.query.category
    let authorid = req.query.authorid
    let tagName = req.query.tag
    let subcategoryName = req.query.subcategory
    
    let document = await blogsModel.find({$in:[{ category: category }, { authorid: authorid }, { tag: tagName },{ subcategory: subcategoryName }]})
    if (!document) {
        return res.status(404).send({ status: false, msg: "blog not found" })
    }
    let deletedBlog = await blogsModel.updateMany({isPublihed:true},{ isDeleted: true }, { new: true });
    res.status(200).send({status:true,data:deletedBlog })
}






module.exports.getActiveBlogs=getActiveBlogs
module.exports.getSelectiveBlogs=getSelectiveBlogs
module.exports.deletBlog = deletBlog
module.exports.delBlogsByQuery = delBlogsByQuery
module.exports.getBlog = getBlog

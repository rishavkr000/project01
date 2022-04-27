
const authorModel=require('../model/authorModel')
const blogsModel=require('../model/blogsModel')
const mongodb = require("mongodb");


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




// Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

const deletBlog = async function (req, res) {


    let blogId = req.params.blogId;
    let blog = await blogsModel.findById(_id);
    if (!blog) {
        return res.status(404).send({ status: false, msg: "blogId not found" })
    }
    let deleledBlog = await blogsModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
    console.log(deletedBog)
    res.status(200).send({ msg: "blog is deleted" })

}

//Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

const delBlogs = async function (req, res) {
    let category = req.query.category
    let authorid = req.query.authorid
    let tagName = req.query.tag
    let subcategoryName = req.query.subcategory
    if (ispublished == true) {
        let unpublished = req.query.ispublished
    }
    let document = await blogsModel.find({ category: category } || { authorid: authorid } || { tag: tagName } || { subcategory: subcategoryName } || { ispublished: unpublished })
    if (!document) {
        return res.status(404).send({ status: false, msg: "blog not found" })
    }
    let deleledBlog = await blogsModel.Update({ isDeleted: true }, { new: true });
    console.log(deletedBog)
    res.status(200).send({ msg: "blog status upated as isdelete:true" })



}



module.exports.deletBlog = deletBlog
module.exports.delBlogs = delBlogs


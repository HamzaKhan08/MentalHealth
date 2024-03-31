const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

// ===================== CREATE POST =================== //
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;

    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail.", 422)
      );
    }
    const { thumbnail } = req.files;

    // check the file size

    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("File size is too big, must be less than 2MB", 422)
      );
    }
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created", 422));
          }

          // find user and increase post count by 1
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ===================== GET ALL POSTS =================== //
// GET : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ===================== GET SINGLE POST =================== //
// GET : api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found!", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ===================== GET POST BY CATEGORY =================== //
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ===================== GET USER/AUTHOR POST =================== //
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ===================== Edit POST =================== //
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFilename;
    let updatePost;
    const postId = req.params.id;
    let {title, category, description} = req.body;
    // ReactQuill used to check if description have 11 chracters already.
    if(!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields.", 422))
    }
    if(!req.files) {
      updatePost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
    } else {
      // get old posts
      const oldPost = await Post.findById(postId);
      // delete old thumbnail
      fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
        if(err) {
          return next(new HttpError(err))
        }
      })
      // upload a new thumbnail
      const {thumbnail} = req.files;
      // check the size of file
      if(thumbnail.size > 2000000) {
        return next(new HttpError("Thumbnail is too big, must be less than 2mb."))
      }
      fileName = thumbnail.name;
      let splittedFilename = fileName.split('.')
      newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
      thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
        if(err) {
          return next(new HttpError(err))
        }
      })

      updatePost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFilename}, {new: true})
    }
    if(!updatePost) {
      return next(new HttpError("Couldn't Update Post", 400))
    }

    res.status(200).json(updatePost)

  } catch (error) {
    return next(new HttpError(error))
  }
}



// ===================== DELETE POST =================== //
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if(!postId) {
      return next(new HttpError("Post not available.", 400))
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;
    // delete thumbnail from uploads folder
    fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
      if(err) {
        return next(new HttpError(err))
      } else {
        await Post.findByIdAndDelete(postId);
        // find user and reduce post by 1
        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser?.posts - 1;
        await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
      }
    })

    res.json(`Post ${postId} deleted Successfully.`)

  } catch (error) {
    return next(new HttpError(err))
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPost,
  editPost,
  deletePost,
};

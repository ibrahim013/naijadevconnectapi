const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load post model
const Post = require("../../../models/Post");
const Profile = require("../../../models/Profile");
//Validator
const validatePostInput = require("../../../validators/post.js");

/**
 * @description GET api/posts/test route
 * @access  private
 *
 * @return json object
 */
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

/**
 * @description POST api/posts route make a post
 * @access  private
 *
 * @return json object
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    let newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(400).json(err));
  }
);
/**
 * @description GET api/posts/all get all post
 * @access  private
 *
 * @return json object
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopost: "no post found" }));
});

/**
 * @description GET api/posts/:id get post by id
 * @access  private
 *
 * @return json object
 */
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopost: "no post found" }));
});

/**
 * @description DELETE api/posts/:id delete post by id
 * @access  private
 *
 * @return json object
 */
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unauthorized: "you cant delete someone else post" });
          }
          post.remove().then(() => {
            res.json({ message: "post deleted successfully" });
          });
        })
        .catch(err => res.status(404).json({ message: "post not found" }));
    });
  }
);

/**
 * @description DELETE api/posts/like/post_id like a post by id
 * @access  private
 *
 * @return json object
 */
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .lenght > 0
          ) {
            return res
              .status(400)
              .json({ alreadylike: "user already like the post" });
          }
          post.likes.push({ user: req.user.id });
          post.save().then(post => res.json(post));
        });
      })
      .catch(err => res.status(500).json({ message: "somthing went wrong" }));
  }
);

/**
 * @description Post api/posts/like/post_id unlike like a post by id
 * @access  private
 *
 * @return json object
 */
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id).then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .lenght === 0
          ) {
            return res
              .status(400)
              .json({ notlike: "this post was never liked by you" });
          }
          //find the index of the user in the array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        });
      })
      .catch(err => res.status(500).json({ message: "somthing went wrong" }));
  }
);

/**
 * @description DELETE api/posts/comment/post_id comment on a post by id
 * @access  private
 *
 * @return json object
 */
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    Post.findById(req.params.post_id).then(post => {
      if (!post) return res.status(404).json({msg: "post not found"})
      const newPost = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      post.comments.unshift(newPost);
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json({ mesage: "somthing went wrong" }));
    });
  }
);

/**
 * @description DELETE api/posts/:id delete post by id
 * @access  private
 *
 * @return json object
 */
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post =>{
      if(post.comments.filter(comment => comment.id.toString() === req.params.comment_id).lenght === 0){
        return res.status(404).json({commentsearch: "comment not found"})
      }
      const removeIndex = post.comments.map(item => item.id.toString() === req.params.comment_id)
      post.comments.splice(removeIndex, 1)
      post.save().then(post => res.json(post)).catch(err=> res.status(400).json ({mes: "something whent wrong"}))
    }).catch(err => res.status(500).json({msg: "something went wrong"}))
  }
);
module.exports = router;

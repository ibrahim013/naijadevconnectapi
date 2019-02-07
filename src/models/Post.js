import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text:{
    type: String,
    required: true
  },
  name:{
    type: String,
  },
  avatar:{
    type: String,
  },
  likes:[
    {
      user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments:[{
    user:{
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text:{
      type: String,
      required: true
    },  
    name:{
      type: String,
    },
    avatar:{
      type: String,
    },
    data:{
      type: Date,
      default: Date.now
    }
  }],
  data:{
    type: Date,
    default: Date.now
  }
})
export default model('post', PostSchema)
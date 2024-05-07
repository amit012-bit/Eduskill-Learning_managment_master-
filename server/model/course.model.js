import { model, Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [50, "Title must be less than 50 characters"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [7, "Description must be at least 7 characters"],
    maxLength: [200, "Title must be less than 200 characters"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
  thumbnail: {
    public_id: {
      type: String,
      required: true
    },
    secure_url: {
      type: String,
      required: true
    },
  },
  lectures: [
    {
      title: String,
      description: String,
      lecture: {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  numberOfLectures:{
    type: Number,
    default: 0,
  },
  createdBy:{
    type: String,
    required: true
  }
},{
    timestamps: true
});


const Course= model('Course', courseSchema);

export default Course;
import Course from "../model/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All Courses",
      courses,
    });
  } catch (error) {
    return next(new AppError("Unable to retrieve the courses", 500));
  }
};

const getLecturesByCourseId = async function (req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched succesfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(
      new AppError("Unable to retrieve this particular course!", 500)
    );
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "Dummy",
        secure_url: "Dummy",
      },
    });

    if (!course) {
      return next(
        new AppError("Course could not be created, please try again later", 500)
      );
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }
      fs.rm(`uploads/${req.file.filename}`);
    }
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course created succesfuly",
      course,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Course with given id does not exists", 500));
    }

    res.status(200).json({
      success: true,
      message: "Course updated succesfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course with given id does not exists", 500));
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Course deleted succesfully`,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("Title and description are mandatory", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course with given id does not exists", 500));
    }

    const lectureData = {
      title,
      description,
      lecture:{}
    };

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
      }
      fs.rm(`uploads/${req.file.filename}`);
    }

    course.lectures.push(lectureData);

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture succesfully added to the course",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// const deleteLecture= async (req, res, next)=>{
//     try {
//         const { id } = req.params;
//         const lecture = await Course.lectures.findById(id);
    
//         if (!lecture) {
//           return next(new AppError("Lecture with given id does not exists", 500));
//         }
    
//         res.status(200).json({
//           success: true,
//           message: `Lecture deleted succesfully`,
//         });
//       } catch (error) {
//         return next(new AppError(error.message, 500));
//       }
// }

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  //deleteLecture
};

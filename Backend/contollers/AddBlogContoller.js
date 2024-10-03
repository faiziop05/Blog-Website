import { v2 as cloudinary } from "cloudinary";
import { UploadNewBlog } from "../models/UploadBlogModel.js";

// Cloudinary image upload controller
export const addNewBlog = async (req, res) => {
  const image = req.file; // Uploaded file
  const { title, category, content, userId } = req.body; // Blog form data

  try {
    // Ensure that the file is received properly
    if (!image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    const randomNum = Math.random(10000) * 10;
    // Upload the image buffer to Cloudinary
    const uploadResult = cloudinary.uploader.upload_stream(
      { public_id: `${title}${category}${userId}${randomNum}` }, // Use userId as the public ID
      (error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
          return res.status(500).json({ error: "Image upload failed" });
        }

        // Optimize the image
        const optimizeUrl = cloudinary.url(result.public_id, {
          fetch_format: "auto",
          quality: "auto",
        });

        // Save the blog post to the database
        const blogPost = new UploadNewBlog({
          title,
          category,
          content,
          userId,
          coverImage: optimizeUrl, // Use the optimized image URL
        });

        blogPost
          .save()
          .then(() =>
            res.status(200).json({ message: "Blog uploaded successfully" })
          )
          .catch((dbError) => {
            console.error("Error saving blog post:", dbError);
            res.status(500).json({ error: "Failed to save blog post" });
          });
      }
    );

    // Pipe the image buffer to the Cloudinary upload stream
    if (image.buffer) {
      const stream = uploadResult;
      stream.end(image.buffer); // Send image buffer to Cloudinary
    } else {
      console.error("Image buffer not found");
      return res.status(400).json({ error: "Image buffer not found" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { page } = req.params;

    const limit = parseInt(req.query.limit) || 15;
    const startIndex = (page - 1) * limit;
    const total = await UploadNewBlog.countDocuments();
    const blogs = await UploadNewBlog.find().skip(startIndex).limit(limit);
    const MetaData = blogs.map((item) => {
      return {
        title: item.title,
        category: item.category,
        coverImage: item.coverImage,
        id: item._id,
      };
    });

    res.status(200).json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: MetaData,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogsByCategories = async (req, res) => {
  try {
    const { category } = req.body;
    const page = 1;
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;
    const total = await UploadNewBlog.countDocuments();
    const blogs = await UploadNewBlog.find({ category: category })
      .skip(startIndex)
      .limit(limit);
    const MetaData = blogs.map((item) => {
      return {
        title: item.title,
        category: item.category,
        coverImage: item.coverImage,
        id: item._id,
      };
    });

    res.status(200).json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: MetaData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const blog = await UploadNewBlog.findOne({ _id: id });
    if (!blog) {
      res.status(400).json({ message: "No Blog Found" });
    }
    res.status(200).json({
      data: blog,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getMyBlogsById = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const blog = await UploadNewBlog.find({ userId: userId });
    if (!blog || blog.length < 1) {
      res.status(400).json({ message: "No Blog Found" });
    }
    res.status(200).json({
      data: blog,
    });
  } catch (error) {
    console.log(error);
  }
};
export const DeleteMyBlogById = async (req, res) => {
  try {
    const { userId, id } = req.body;
    const blog = await UploadNewBlog.findOneAndDelete({
      userId: userId,
      _id: id,
    });
    if (!blog) {
      res.status(400).json({ message: "No Blog Found to Delete" });
    }
    res.status(200).json({ message: "Blog Deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const EditMyBlogById = async (req, res) => {
  const image = req.file; // Uploaded file
  const { title, category, content, userId, _id } = req.body; // Blog form data

  try {
    // Ensure that the file is received properly
    if (!image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Create a promise for the Cloudinary upload
    const uploadImageToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const randomNum = Math.random() * 10000; // Fixed to avoid multiplying by 10
        const stream = cloudinary.uploader.upload_stream(
          { public_id: `${title}${category}${userId}${randomNum}` }, // Use userId as the public ID
          (error, result) => {
            if (error) {
              console.error("Error uploading image:", error);
              return reject(new Error("Image upload failed"));
            }
            resolve(result);
          }
        );

        // Pipe the image buffer to the Cloudinary upload stream
        if (image.buffer) {
          stream.end(image.buffer); // Send image buffer to Cloudinary
        } else {
          console.error("Image buffer not found");
          return reject(new Error("Image buffer not found"));
        }
      });
    };

    // Await the Cloudinary upload
    const uploadResult = await uploadImageToCloudinary();

    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    // Update the blog post
    const blogPost = await UploadNewBlog.findOneAndUpdate(
      { _id: _id },
      {
        title,
        category,
        content,
        userId,
        coverImage: optimizeUrl, // Use the optimized image URL
      },
      { new: true } // Return the updated document
    );

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    return res.status(200).json({ message: "Blog uploaded successfully", blogPost });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

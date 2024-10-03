import { Router } from "express";
const router=Router()
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
// import { authenticateToken } from "../middleware/UserMiddleWhere.js";
import { addNewBlog, DeleteMyBlogById, EditMyBlogById, getBlogById, getBlogs, getBlogsByCategories, getMyBlogsById } from "../contollers/AddBlogContoller.js";

router.get("/getBlogs:page",getBlogs)
router.post("/getBlogsByCategory",getBlogsByCategories)
router.get("/getBlogById:id",getBlogById)
router.post("/getMyBlogsById",getMyBlogsById)
router.post("/DeleteMyBlogById",DeleteMyBlogById)
router.post("/EditMyBlogById",upload.single('image'),EditMyBlogById)
router.post('/uploadBlog', upload.single('image'), addNewBlog);

export default router
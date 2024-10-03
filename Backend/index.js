import express from "express";
import dotenv from "dotenv";
import {database} from "./configs/db.js"
import registerUserRoute from "./routes/registerUserRoute.js"
import UserRoutes from "./routes/UserRoutes.js"
import UploadBlogRoute from "./routes/UploadBlogRoute.js"
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';

(async function() {
    cloudinary.config({
      cloud_name: 'deo4larpc',
      api_key: 'API_KEY',
      api_secret: 'SECRET_KEY',
      secure: true,
    });
})();


dotenv.config(); // Load environment variables
const app = express();
database();
app.use(cors());
app.use(express.json());

app.use('/api/user',registerUserRoute );
app.use('/api/user',UserRoutes );
app.use('/api/user',UploadBlogRoute );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

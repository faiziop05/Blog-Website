import "./App.css";
import { AddBlog, Home,CategoryScreen, Login, SignUp ,BlogReadScreen, MyBlogs,Settings} from "./Screens";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="AddBlog" element={<AddBlog />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="BlogReadScreen" element={<BlogReadScreen />} />
        <Route path="CategoryScreen" element={<CategoryScreen />} />
        <Route path="MyBlogs" element={<MyBlogs />} />
        <Route path="Settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;

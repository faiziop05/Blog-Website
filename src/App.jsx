import "./App.css";
import { AddBlog, Home, Login, SignUp ,BlogReadScreen} from "./Screens";
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;

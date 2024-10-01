import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NAvBar from "../../components/NAvBar";
import "../../Styles/AddBlog.css";
import { convertToHTML } from "draft-convert";

const AddBlog = () => {
  const [user, setUser] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log(user);

  const [title, setTitle] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState("");

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Create a preview URL for the image
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data); // Set user data
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };
    fetchUser();
  }, []); // Dependency array is empty, so this effect only runs once
  // console.log(selectedImage);
  const toHTML = convertToHTML({
    blockToHTML: (block) => {
      // Handle code block
      if (block.type === "code-block") {
        return (
          <pre>
            <code>{block.text}</code>
          </pre>
        );
      }
      // Return default for other blocks
      return null;
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === "IMAGE") {
        const { src, alt } = entity.data;
        return `<figure><img src="${src}" align="left" alt="${
          alt || "image"
        }" /></figure>`;
      }
      return originalText;
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === "LINK") {
        return (
          <a target="_blank" href={entity.data.url}>
            {originalText}
          </a>
        );
      }
      return originalText;
    },
  });

  const handleSubmit = async () => {
    const content = toHTML(editorState.getCurrentContent());

    if (!title || !selectedImage || !selectedTags || !content || !user) {
      alert("Please Fill and Select Everrthing First then Submit the Blog");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);
    formData.append("category", selectedTags);
    formData.append("content", content);
    formData.append("userId", user._id);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/uploadBlog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        alert("Successfully Uploaded Blog");
      }
    } catch (error) {
      console.error("Error uploading Blog:", error);
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const getContentAsHTML = () => {
    const contentState = editorState.getCurrentContent();
    console.log("Content State Blocks:", contentState.getBlocksAsArray()); // Log the blocks
    const html = convertToHTML(contentState);
    console.log("HTML Content:", html); // Log the HTML output
    return html;
  };

  return (
    <div>
      <NAvBar disableScreen={false} />
      <h2 className="AddBlogtitle">Create a New Blog Post</h2>

      <div>
        <label htmlFor="coverImage" className="BlogCoverupload-button ">
          Upload Cover Image
        </label>
        <input
          id="coverImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="BlogCoverfile-input"
        />
        {selectedImage && (
          <div className="BlogCoverpreview-container">
            <p>Image Preview:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Cover Preview"
              className="BlogCoverimage-preview"
            />
          </div>
        )}

        <div className="selected-tags-container">
          <label htmlFor="tags">Select Category</label>
          <select
            id="tags"
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            className="tags-select"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      <div className="AddBlogcontainer">
        <div className="editor-container">
          {previewMode ? (
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: getContentAsHTML() }}
            />
          ) : (
            <>
              <input
                className="AddBlogScreenTitleBlog"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Blog Title here"
              />
<Editor
  editorState={editorState}
  toolbar={{
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
      "image",
      "emoji",
      "remove",
      "history",
    ],
    inline: { 
      options: ["bold", "italic", "underline", "strikethrough"] 
    },
    list: {
      options: ["unordered", "ordered"],
    },
    textAlign: {
      options: ["left", "center", "right", "justify"],
    },
    link: {
      options: ["link", "unlink"],
    },
    image: {
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
    },
    embedded: {
      defaultSize: {
        height: 'auto',
        width: '100%'
      }
    }
  }}
  onEditorStateChange={setEditorState}
  placeholder="Start writing your blog..."
/>

            </>
          )}
        </div>
        <div className="buttons">
          <button className="submit-button" onClick={handleSubmit}>
            Submit Blog
          </button>
          <button className="preview-button" onClick={togglePreviewMode}>
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;

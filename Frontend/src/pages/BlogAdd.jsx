import React, { useState } from "react";
import axios from "axios";

function AddBlog() {
  const [image, setImage] = useState(null);
  const [previeu, setPrevieu] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  
  const handelFileChenge = (e) => {
    let imageFile = e.target.files[0];
    setImage(imageFile);

    let imgUrl = URL.createObjectURL(imageFile);
    setPrevieu(imgUrl);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", previeu);
    
    try {
      const data = await axios.post("http://localhost:5000/api/blog/blogAdd",{title, category,content,image:previeu} 
        
      );
      console.log(data);
      alert("Add success");
      
    } catch (error) {
      console.log("addBlogError", error);
    }
  };

  return (
    <>
      <div>
        <form>
          <h2>Add New Blog</h2>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name="title"
              required
            />
          </div>

          <div>
            <label htmlFor="tags">Category</label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name="category"
              required
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <input
              type="text"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              name="content"
              required
            />
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <input type="file" onChange={handelFileChenge} name="image" required/>
          </div>

          <button onClick={handelSubmit}>Contained</button>
        </form>
      </div>
    </>
  );
}

export default AddBlog;

import React, { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/news/blogAdd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog added successfully!");
    } catch (error) {
      console.error(1,error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;

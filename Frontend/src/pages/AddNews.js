// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AddNews() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [author, setAuthor] = useState("");
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       formData.append("category", category);
//       formData.append("author", author);
//       if (image) formData.append("image", image);
//          // ✅ Get token from localStorage
//     const token = localStorage.getItem("token");
    
//       await API.post("/news", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       navigate("/");
//     } catch (error) {
//       alert("Error adding news");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-sm p-4">
//         <h2 className="mb-4">➕ Add News</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Category</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Content</label>
//             <textarea
//               className="form-control"
//               rows="5"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             ></textarea>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Author</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Upload Image</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </div>
//           </div>

//           {image && (
//             <div className="mb-3">
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="preview"
//                 className="img-fluid rounded"
//                 style={{ maxHeight: "200px", objectFit: "cover" }}
//               />
//             </div>
//           )}

//           <button className="btn btn-success w-100">Add News</button>
//         </form>
//       </div>
//     </div>
//   );
// }

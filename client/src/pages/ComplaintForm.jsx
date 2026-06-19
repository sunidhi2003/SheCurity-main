// import React, { useState, useEffect } from "react";
// import "../styles/ComplaintForm.module.css";

// const ComplaintForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [category, setCategory] = useState("Harassment");
//   const [location, setLocation] = useState("");
//   const [complaints, setComplaints] = useState([]);

//   // Load complaints from localStorage on component mount
//   useEffect(() => {
//     const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
//     setComplaints(storedComplaints);
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (!name ||!email||  !location) {
//       alert("⚠️ Please fill in all fields!");
//       return;
//     }

//     // Fetch coordinates for the location
//     let coordinates = await getCoordinates(location);
//     if (coordinates.error) {
//       alert("⚠️ Unable to find location. Try a different place.");
//       return;
//     }

//     // Find the nearest police station
//     let policeStation = await findNearestPoliceStation(coordinates.lat, coordinates.lon);

//     // Create a new complaint object
//     const newComplaint = {
//       name,
//       email,
//       category,
//       location,
//       timestamp: new Date().toLocaleString(),
//       policeStation,
//     };

//     // Update complaints list and localStorage
//     const updatedComplaints = [...complaints, newComplaint];
//     setComplaints(updatedComplaints);
//     localStorage.setItem("complaints", JSON.stringify(updatedComplaints));

//     // Reset form fields
//     setName("");
//     setEmail("");
//     setLocation("");

//     // Show success message
//     alert("✅ Complaint submitted successfully!");
//   };

//   // Fetch coordinates using OpenStreetMap API
//   const getCoordinates = async (location) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`
//       );
//       const data = await response.json();

//       if (data.length === 0) {
//         return { error: "Location not found." };
//       }
//       return { lat: data[0].lat, lon: data[0].lon };
//     } catch (error) {
//       console.error("⚠️ Error fetching coordinates:", error);
//       return { error: "API error" };
//     }
//   };

//   // Find the nearest police station using Overpass API
//   const findNearestPoliceStation = async (lat, lon) => {
//     try {
//       const overpassQuery = `[out:json];node["amenity"="police"](around:10000,${lat},${lon});out;`;
//       const response = await fetch(
//         `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
//       );
//       const data = await response.json();

//       if (data.elements.length > 0) {
//         return data.elements
//           .slice(0, 3) // Limit to 3 nearest police stations
//           .map((el) => {
//             let name = el.tags.name || "Unnamed Police Station";
//             let mapLink = `https://www.google.com/maps/search/?api=1&query=${el.lat},${el.lon}`;
//             return`${name} (<a href="${mapLink}" target="_blank">View on Map</a>)`;
//           })
//           .join("<br>");
//       } else {
//         return "No nearby police station found.";
//       }
//     } catch (error) {
//       console.error("⚠ Error fetching police station:", error);
//       return "Error fetching police station.";
//     }
//   };

//   // Delete a complaint
//   const deleteComplaint = (index) => {
//     const updatedComplaints = complaints.filter((_, i) => i !== index);
//     setComplaints(updatedComplaints);
//     localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
//   };

//   return (
//     <div className="container">
//       <h2>📢 Report a Complaint</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           placeholder="👩 Your Name"
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           placeholder="📧 Your Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option>Harassment</option>
//           <option>Cyber Harassment</option>
//           <option>Domestic Violence</option>
//           <option>Public Harassment</option>
//           <option>Stalking</option>
//           <option>Human Trafficking</option>
//         </select>
//         <input
//           type="text"
//           value={location}
//           placeholder="📍 Enter Your Location"
//           onChange={(e) => setLocation(e.target.value)}
//           required
//         />
//         <button type="submit">🚀 Submit Complaint</button>
//       </form>

//       <h2>📜 Submitted Complaints</h2>
//       <ul>
//         {complaints.map((complaint, index) => (
//           <li key={index}>
//             <strong>{complaint.name}</strong> - {complaint.category} <br />
//             📍 {complaint.location} | 📅 {complaint.timestamp} <br />
//             🚔 Nearest Police Station: <span dangerouslySetInnerHTML={{ __html: complaint.policeStation }}></span> <br />
//             <button className="delete-btn" onClick={() => deleteComplaint(index)}>
//               🗑 Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ComplaintForm;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config";
// import styles from "../styles/ComplaintForm.module.css";

// export default function ComplaintForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     category: "",
//     address: "",
//     pincodeOfIncident: "",
//     report: "",
//   });

//   const [message, setMessage] = useState("");
//   const [complaints, setComplaints] = useState([]);

//   // 🔹 Fetch all complaints
//   const fetchComplaints = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}api/incidents`);
//       setComplaints(res.data || []);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}api/incidents`, formData);
//       setMessage(res.data.message || "✅ Complaint submitted successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         category: "",
//         address: "",
//         pincodeOfIncident: "",
//         report: "",
//       });
//       fetchComplaints(); // refresh list after submit
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Failed to submit complaint.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>File a Complaint</h2>

//       {message && (
//         <p
//           className={
//             message.includes("❌") ? styles.errorMessage : styles.successMessage
//           }
//         >
//           {message}
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email (optional)"
//           value={formData.email}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category (e.g., Harassment, Theft)"
//           value={formData.category}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Incident Address"
//           value={formData.address}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//         <input
//           type="text"
//           name="pincodeOfIncident"
//           placeholder="Pincode"
//           value={formData.pincodeOfIncident}
//           onChange={handleChange}
//           className={styles.input}
//         />
//         <textarea
//           name="report"
//           placeholder="Describe the incident"
//           value={formData.report}
//           onChange={handleChange}
//           className={styles.textarea}
//           required
//         ></textarea>

//         <button type="submit" className={styles.button}>
//           Submit Complaint
//         </button>
//       </form>

//       {/* Complaint List */}
//       <h2 className={styles.subtitle}>📜 Submitted Complaints</h2>
//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Address</th>
//               <th>Pincode</th>
//               <th>Report</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.length > 0 ? (
//               complaints.map((c, index) => (
//                 <tr key={index}>
//                   <td>{c.name}</td>
//                   <td>{c.category}</td>
//                   <td>{c.address}</td>
//                   <td>{c.pincodeOfIncident}</td>
//                   <td>{c.report}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No complaints found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


//new by Yashswi
// ./pages/ComplaintForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { socket } from "../helpers/socketHelper"; // make sure you export socket from here
import styles from "../styles/ComplaintForm.module.css";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    address: "",
    pincodeOfIncident: "",
    report: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}api/incidents`, formData);
      setMessage(res.data.message || "✅ Complaint submitted successfully!");
      if(socket){
        socket.emit("new-incident",res.data.incident);
      }
      setFormData({
        name: "",
        email: "",
        category: "",
        address: "",
        pincodeOfIncident: "",
        report: "",
      });

      // Notify authority via WebSocket
      // if (socket) {
      //   socket.emit("new-incident", res.data.incident);
      // }

    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit complaint.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>File a Complaint</h2>
      {message && <p className={message.includes("❌") ? styles.errorMessage : styles.successMessage}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={styles.input} required />
        <input type="email" name="email" placeholder="Your Email (optional)" value={formData.email} onChange={handleChange} className={styles.input} />
        <select name="category" value={formData.category} onChange={handleChange} className={styles.input} required>
          <option value="">Select Category</option>
          <option value="Harassment">Harassment</option>
          <option value="Cyber Harassment">Cyber Harassment</option>
          <option value="Domestic Violence">Domestic Violence</option>
          <option value="Public Harassment">Public Harassment</option>
          <option value="Stalking">Stalking</option>
          <option value="Human Trafficking">Human Trafficking</option>
        </select>
        <input type="text" name="address" placeholder="Incident Address" value={formData.address} onChange={handleChange} className={styles.input} required />
        <input type="text" name="pincodeOfIncident" placeholder="Pincode" value={formData.pincodeOfIncident} onChange={handleChange} className={styles.input} />
        <textarea name="report" placeholder="Describe the incident" value={formData.report} onChange={handleChange} className={styles.textarea} required />
        <button type="submit" className={styles.button}>Submit Complaint</button>
      </form>
    </div>
  );
}
export default ComplaintForm

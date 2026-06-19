

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config";
// import { socket } from "../helpers/socketHelper";
// import styles from "../styles/Authority.module.css";
// import { Link } from "react-router-dom";

// export default function AuthorityDashboard() {
//   const [incidents, setIncidents] = useState([]);

//   // Fetch all incidents on mount
//   const fetchIncidents = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}api/incidents`);
//       setIncidents(res.data || []);
//     } catch (err) {
//       console.error("Error fetching incidents:", err);
//     }
//   };

//   useEffect(() => {
//     fetchIncidents();

//     // Listen for real-time incident updates
//     if (socket) {
//       socket.on("new-incident", (incident) => {
//         setIncidents((prev) => [incident, ...prev]);
//         alert(`🚨 New incident reported by ${incident.name}`);
//       });
//     }

//     return () => {
//       if (socket) socket.off("new-incident");
//     };
//   }, []);

//   // Acknowledge an incident
//   const acknowledgeIncident = async (id) => {
//     try {
//       await axios.patch(`${BASE_URL}api/incidents/acknowledge/${id}`);
//       setIncidents((prev) =>
//         prev.map((inc) =>
//           inc._id === id ? { ...inc, isSeen: true } : inc
//         )
//       );
//     } catch (err) {
//       console.error("Failed to acknowledge incident:", err);
//     }
//   };

//   return (

//     <div className={styles.container}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//   <h2 className={styles.title}>Authority Dashboard</h2>
//   <Link to="/authority-analytics" className={styles.analyticsLink}>
//     📊 View Analytics
//   </Link>
// </div>
      
//       <h2 className={styles.title}>Authority Dashboard</h2>
//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Address</th>
//               <th>Pincode</th>
//               <th>Report</th>
//               <th>Status</th>
//               <th>Acknowledge</th>
//             </tr>
//           </thead>
//           <tbody>
//             {incidents.length ? (
//               incidents.map((incident) => (
//                 <tr
//                   key={incident._id}
//                   className={!incident.isSeen ? styles.newIncident : ""}
//                 >
//                   <td>{incident.name}</td>
//                   <td>{incident.category}</td>
//                   <td>{incident.address}</td>
//                   <td>{incident.pincodeOfIncident}</td>
//                   <td>{incident.report}</td>
//                   <td>
//                     {incident.isSeen ? "✅ Seen" : "⚠️ New"}
//                   </td>
//                   <td>
//                     {!incident.isSeen && (
//                       <button
//                         className={styles.ackButton}
//                         onClick={() =>
//                           acknowledgeIncident(incident._id)
//                         }
//                       >
//                         Acknowledge
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No incidents found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config";
// import { socket } from "../helpers/socketHelper";
// import styles from "../styles/Authority.module.css";
// import { Link } from "react-router-dom";

// export default function AuthorityDashboard() {
//   const [incidents, setIncidents] = useState([]);
//   const [filteredIncidents, setFilteredIncidents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");
//   const [isLoading, setIsLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     new: 0,
//     acknowledged: 0,
//     categories: {}
//   });

//   // Calculate statistics
//   const calculateStats = (incidentList) => {
//     const total = incidentList.length;
//     const newCount = incidentList.filter(inc => !inc.isSeen).length;
//     const acknowledged = incidentList.filter(inc => inc.isSeen).length;
    
//     const categories = incidentList.reduce((acc, inc) => {
//       acc[inc.category] = (acc[inc.category] || 0) + 1;
//       return acc;
//     }, {});

//     setStats({ total, new: newCount, acknowledged, categories });
//   };

//   // Filter and sort incidents
//   const filterAndSortIncidents = (incidentList, search, category, status, sort) => {
//     let filtered = incidentList;

//     // Search filter
//     if (search) {
//       filtered = filtered.filter(inc => 
//         inc.name.toLowerCase().includes(search.toLowerCase()) ||
//         inc.address.toLowerCase().includes(search.toLowerCase()) ||
//         inc.report.toLowerCase().includes(search.toLowerCase()) ||
//         inc.pincodeOfIncident.toString().includes(search)
//       );
//     }

//     // Category filter
//     if (category !== "all") {
//       filtered = filtered.filter(inc => inc.category === category);
//     }

//     // Status filter
//     if (status !== "all") {
//       filtered = filtered.filter(inc => 
//         status === "new" ? !inc.isSeen : inc.isSeen
//       );
//     }

//     // Sort
//     filtered.sort((a, b) => {
//       switch (sort) {
//         case "newest":
//           return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
//         case "oldest":
//           return new Date(a.createdAt || a._id) - new Date(b.createdAt || b._id);
//         case "category":
//           return a.category.localeCompare(b.category);
//         case "name":
//           return a.name.localeCompare(b.name);
//         default:
//           return 0;
//       }
//     });

//     setFilteredIncidents(filtered);
//   };

//   // Update filtered incidents when filters change
//   useEffect(() => {
//     filterAndSortIncidents(incidents, searchTerm, categoryFilter, statusFilter, sortBy);
//     calculateStats(incidents);
//   }, [incidents, searchTerm, categoryFilter, statusFilter, sortBy]);

//   // Fetch all incidents on mount
//   const fetchIncidents = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}api/incidents`);
//       setIncidents(res.data || []);
//     } catch (err) {
//       console.error("Error fetching incidents:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncidents();

//     // Listen for real-time incident updates
//     if (socket) {
//       socket.on("new-incident", (incident) => {
//         setIncidents((prev) => [incident, ...prev]);
//         alert(`🚨 New incident reported by ${incident.name}`);
//       });
//     }

//     return () => {
//       if (socket) socket.off("new-incident");
//     };
//   }, []);

//   // Acknowledge an incident
//   const acknowledgeIncident = async (id) => {
//     try {
//       await axios.patch(`${BASE_URL}api/incidents/acknowledge/${id}`);
//       setIncidents((prev) =>
//         prev.map((inc) =>
//           inc._id === id ? { ...inc, isSeen: true } : inc
//         )
//       );
//     } catch (err) {
//       console.error("Failed to acknowledge incident:", err);
//     }
//   };

//   // Get unique categories
//   const getUniqueCategories = () => {
//     return [...new Set(incidents.map(inc => inc.category))];
//   };

//   // Bulk acknowledge all new incidents
//   const acknowledgeAllNew = async () => {
//     const newIncidents = incidents.filter(inc => !inc.isSeen);
//     if (newIncidents.length === 0) return;

//     try {
//       await Promise.all(
//         newIncidents.map(inc => 
//           axios.patch(`${BASE_URL}api/incidents/acknowledge/${inc._id}`)
//         )
//       );
//       setIncidents(prev => 
//         prev.map(inc => ({ ...inc, isSeen: true }))
//       );
//     } catch (err) {
//       console.error("Failed to acknowledge all incidents:", err);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//         <h2 className={styles.title}>Authority Dashboard</h2>
//         <Link to="/authority-analytics" className={styles.analyticsLink}>
//           📊 View Analytics
//         </Link>
//       </div>

//       {/* Statistics Cards */}
//       <div className={styles.statsContainer}>
//         <div className={styles.statCard}>
//           <div className={styles.statNumber}>{stats.total}</div>
//           <div className={styles.statLabel}>Total Incidents</div>
//         </div>
//         <div className={styles.statCard}>
//           <div className={`${styles.statNumber} ${styles.newCount}`}>{stats.new}</div>
//           <div className={styles.statLabel}>New Reports</div>
//         </div>
//         <div className={styles.statCard}>
//           <div className={`${styles.statNumber} ${styles.acknowledgedCount}`}>{stats.acknowledged}</div>
//           <div className={styles.statLabel}>Acknowledged</div>
//         </div>
//         <div className={styles.statCard}>
//           <div className={styles.statNumber}>{Object.keys(stats.categories).length}</div>
//           <div className={styles.statLabel}>Categories</div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className={styles.filtersContainer}>
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             placeholder="Search incidents..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={styles.searchInput}
//           />
//         </div>

//         <div className={styles.filterGroup}>
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className={styles.filterSelect}
//           >
//             <option value="all">All Categories</option>
//             {getUniqueCategories().map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className={styles.filterSelect}
//           >
//             <option value="all">All Status</option>
//             <option value="new">New Only</option>
//             <option value="acknowledged">Acknowledged Only</option>
//           </select>

//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className={styles.filterSelect}
//           >
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//             <option value="category">By Category</option>
//             <option value="name">By Name</option>
//           </select>
//         </div>

//         {stats.new > 0 && (
//           <button
//             onClick={acknowledgeAllNew}
//             className={styles.bulkActionButton}
//           >
//             Acknowledge All New ({stats.new})
//           </button>
//         )}
//       </div>

//       {/* Results Summary */}
//       <div className={styles.resultsSummary}>
//         Showing {filteredIncidents.length} of {incidents.total} incidents
//         {searchTerm && ` matching "${searchTerm}"`}
//       </div>

//       <h2 className={styles.title}>Authority Dashboard</h2>
      
//       {isLoading ? (
//         <div className={styles.loadingContainer}>
//           <div className={styles.loader}>Loading incidents...</div>
//         </div>
//       ) : (
//         <div className={styles.tableWrapper}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Address</th>
//                 <th>Pincode</th>
//                 <th>Report</th>
//                 <th>Status</th>
//                 <th>Acknowledge</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredIncidents.length ? (
//                 filteredIncidents.map((incident) => (
//                   <tr
//                     key={incident._id}
//                     className={!incident.isSeen ? styles.newIncident : ""}
//                   >
//                     <td>{incident.name}</td>
//                     <td>
//                       <span className={styles.categoryBadge}>
//                         {incident.category}
//                       </span>
//                     </td>
//                     <td className={styles.addressCell}>
//                       <div className={styles.addressText}>
//                         {incident.address}
//                       </div>
//                     </td>
//                     <td>{incident.pincodeOfIncident}</td>
//                     <td className={styles.reportCell}>
//                       <div className={styles.reportText}>
//                         {incident.report}
//                       </div>
//                     </td>
//                     <td>
//                       <span className={`${styles.statusBadge} ${
//                         incident.isSeen ? styles.seenStatus : styles.newStatus
//                       }`}>
//                         {incident.isSeen ? "✅ Seen" : "⚠️ New"}
//                       </span>
//                     </td>
//                     <td>
//                       {!incident.isSeen && (
//                         <button
//                           className={styles.ackButton}
//                           onClick={() =>
//                             acknowledgeIncident(incident._id)
//                           }
//                         >
//                           Acknowledge
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className={styles.noResults}>
//                     {searchTerm || categoryFilter !== "all" || statusFilter !== "all" 
//                       ? "No incidents match your filters." 
//                       : "No incidents found."
//                     }
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Quick Actions Footer */}
//       {incidents.length > 0 && (
//         <div className={styles.quickActions}>
//           <button 
//             onClick={fetchIncidents}
//             className={styles.refreshButton}
//           >
//             🔄 Refresh Data
//           </button>
//           <span className={styles.lastUpdated}>
//             Last updated: {new Date().toLocaleTimeString()}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { socket } from "../helpers/socketHelper";
import styles from "../styles/Authority.module.css";
import { Link } from "react-router-dom";

export default function AuthorityDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [acknowledgingIds, setAcknowledgingIds] = useState(new Set());
  const [bulkAcknowledging, setBulkAcknowledging] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    acknowledged: 0,
    categories: {}
  });

  // Calculate statistics
  const calculateStats = (incidentList) => {
    const total = incidentList.length;
    const newCount = incidentList.filter(inc => !inc.isSeen).length;
    const acknowledged = incidentList.filter(inc => inc.isSeen).length;
    
    const categories = incidentList.reduce((acc, inc) => {
      acc[inc.category] = (acc[inc.category] || 0) + 1;
      return acc;
    }, {});

    setStats({ total, new: newCount, acknowledged, categories });
  };

  // Filter and sort incidents
  const filterAndSortIncidents = (incidentList, search, category, status, sort) => {
    let filtered = incidentList;

    // Search filter
    if (search) {
      filtered = filtered.filter(inc => 
        inc.name.toLowerCase().includes(search.toLowerCase()) ||
        inc.address.toLowerCase().includes(search.toLowerCase()) ||
        inc.report.toLowerCase().includes(search.toLowerCase()) ||
        inc.pincodeOfIncident.toString().includes(search)
      );
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter(inc => inc.category === category);
    }

    // Status filter
    if (status !== "all") {
      filtered = filtered.filter(inc => 
        status === "new" ? !inc.isSeen : inc.isSeen
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
        case "oldest":
          return new Date(a.createdAt || a._id) - new Date(b.createdAt || b._id);
        case "category":
          return a.category.localeCompare(b.category);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredIncidents(filtered);
  };

  // Update filtered incidents when filters change
  useEffect(() => {
    filterAndSortIncidents(incidents, searchTerm, categoryFilter, statusFilter, sortBy);
    calculateStats(incidents);
  }, [incidents, searchTerm, categoryFilter, statusFilter, sortBy]);

  // Fetch all incidents on mount
  const fetchIncidents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}api/incidents`);
      setIncidents(res.data || []);
    } catch (err) {
      console.error("Error fetching incidents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();

    // Listen for real-time incident updates
    if (socket) {
      socket.on("new-incident", (incident) => {
        setIncidents((prev) => [incident, ...prev]);
        
        // Show notification for new incident
        if (Notification.permission === "granted") {
          new Notification(`🚨 New incident reported`, {
            body: `${incident.name} reported a ${incident.category} incident`,
            icon: "🚨"
          });
        } else {
          alert(`🚨 New incident reported by ${incident.name}`);
        }
      });
    }

    return () => {
      if (socket) socket.off("new-incident");
    };
  }, []);

  // Acknowledge an incident with loading state
  const acknowledgeIncident = async (id) => {
    // Add to acknowledging set
    setAcknowledgingIds(prev => new Set(prev).add(id));
    
    try {
      await axios.patch(`${BASE_URL}api/incidents/acknowledge/${id}`);
      
      // Update incidents state
      setIncidents((prev) =>
        prev.map((inc) =>
          inc._id === id ? { ...inc, isSeen: true } : inc
        )
      );
      
      // Show success feedback
      const incidentName = incidents.find(inc => inc._id === id)?.name;
      if (incidentName) {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.textContent = `✅ Acknowledged incident by ${incidentName}`;
        successMsg.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          font-weight: 600;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(successMsg);
        
        // Remove after 3 seconds
        setTimeout(() => {
          if (successMsg.parentNode) {
            successMsg.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => successMsg.remove(), 300);
          }
          if (style.parentNode) style.remove();
        }, 3000);
      }
      
    } catch (err) {
      console.error("Failed to acknowledge incident:", err);
      
      // Show error feedback
      const errorMsg = document.createElement('div');
      errorMsg.textContent = `❌ Failed to acknowledge incident`;
      errorMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        font-weight: 600;
        z-index: 1000;
      `;
      document.body.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
      
    } finally {
      // Remove from acknowledging set after a delay for smooth transition
      setTimeout(() => {
        setAcknowledgingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 500);
    }
  };

  // Get unique categories
  const getUniqueCategories = () => {
    return [...new Set(incidents.map(inc => inc.category))];
  };

  // Bulk acknowledge all new incidents with loading state
  const acknowledgeAllNew = async () => {
    const newIncidents = incidents.filter(inc => !inc.isSeen);
    if (newIncidents.length === 0) return;

    setBulkAcknowledging(true);

    try {
      await Promise.all(
        newIncidents.map(inc => 
          axios.patch(`${BASE_URL}api/incidents/acknowledge/${inc._id}`)
        )
      );
      
      setIncidents(prev => 
        prev.map(inc => ({ ...inc, isSeen: true }))
      );
      
      // Show success feedback
      const successMsg = document.createElement('div');
      successMsg.textContent = `✅ Successfully acknowledged ${newIncidents.length} incidents`;
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        font-weight: 600;
        z-index: 1000;
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 4000);
      
    } catch (err) {
      console.error("Failed to acknowledge all incidents:", err);
      
      // Show error feedback
      const errorMsg = document.createElement('div');
      errorMsg.textContent = `❌ Failed to acknowledge some incidents`;
      errorMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        font-weight: 600;
        z-index: 1000;
      `;
      document.body.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 4000);
      
    } finally {
      setBulkAcknowledging(false);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 className={styles.title}>Authority Dashboard</h2>
        <Link to="/authority-analytics" className={styles.analyticsLink}>
          📊 View Analytics
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Total Incidents</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statNumber} ${styles.newCount}`}>{stats.new}</div>
          <div className={styles.statLabel}>New Reports</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statNumber} ${styles.acknowledgedCount}`}>{stats.acknowledged}</div>
          <div className={styles.statLabel}>Acknowledged</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{Object.keys(stats.categories).length}</div>
          <div className={styles.statLabel}>Categories</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            {getUniqueCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="new">New Only</option>
            <option value="acknowledged">Acknowledged Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="category">By Category</option>
            <option value="name">By Name</option>
          </select>
        </div>

        {stats.new > 0 && (
          <button
            onClick={acknowledgeAllNew}
            disabled={bulkAcknowledging}
            className={styles.bulkActionButton}
            style={{
              opacity: bulkAcknowledging ? 0.7 : 1,
              cursor: bulkAcknowledging ? 'not-allowed' : 'pointer'
            }}
          >
            {bulkAcknowledging ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Processing...
              </span>
            ) : (
              `Acknowledge All New (${stats.new})`
            )}
          </button>
        )}
      </div>

      {/* Results Summary */}
      <div className={styles.resultsSummary}>
        Showing {filteredIncidents.length} of {incidents.length} incidents
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
      
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}>Loading incidents...</div>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Report</th>
                <th>Status</th>
                <th>Acknowledge</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.length ? (
                filteredIncidents.map((incident) => (
                  <tr
                    key={incident._id}
                    className={!incident.isSeen ? styles.newIncident : ""}
                  >
                    <td>{incident.name}</td>
                    <td>
                      <span className={styles.categoryBadge}>
                        {incident.category}
                      </span>
                    </td>
                    <td className={styles.addressCell}>
                      <div className={styles.addressText}>
                        {incident.address}
                      </div>
                    </td>
                    <td>{incident.pincodeOfIncident}</td>
                    <td className={styles.reportCell}>
                      <div className={styles.reportText}>
                        {incident.report}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        incident.isSeen ? styles.seenStatus : styles.newStatus
                      }`}>
                        {incident.isSeen ? "✅ Seen" : "⚠️ New"}
                      </span>
                    </td>
                    <td>
                      {!incident.isSeen && (
                        <button
                          className={styles.ackButton}
                          onClick={() => acknowledgeIncident(incident._id)}
                          disabled={acknowledgingIds.has(incident._id)}
                          style={{
                            opacity: acknowledgingIds.has(incident._id) ? 0.7 : 1,
                            cursor: acknowledgingIds.has(incident._id) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            justifyContent: 'center'
                          }}
                        >
                          {acknowledgingIds.has(incident._id) ? (
                            <>
                              <div style={{
                                width: '12px',
                                height: '12px',
                                border: '2px solid transparent',
                                borderTop: '2px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }}></div>
                              Processing
                            </>
                          ) : (
                            'Acknowledge'
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noResults}>
                    {searchTerm || categoryFilter !== "all" || statusFilter !== "all" 
                      ? "No incidents match your filters." 
                      : "No incidents found."
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Actions Footer */}
      {incidents.length > 0 && (
        <div className={styles.quickActions}>
          <button 
            onClick={fetchIncidents}
            className={styles.refreshButton}
          >
            🔄 Refresh Data
          </button>
          <span className={styles.lastUpdated}>
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Add CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

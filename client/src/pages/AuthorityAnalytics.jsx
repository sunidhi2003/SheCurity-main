// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config";
// import {
//   BarChart, Bar, PieChart, Pie, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer
// } from "recharts";

// export default function AuthorityAnalytics() {
//   const [incidents, setIncidents] = useState([]);

//   // Fetch incidents
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
//   }, []);

//   // --- Group by Category ---
//   const categoryData = incidents.reduce((acc, inc) => {
//     acc[inc.category] = (acc[inc.category] || 0) + 1;
//     return acc;
//   }, {});
//   const categoryChartData = Object.keys(categoryData).map((key) => ({
//     name: key,
//     value: categoryData[key],
//   }));

//   // --- Group by Pincode ---
//   const pincodeData = incidents.reduce((acc, inc) => {
//     acc[inc.pincodeOfIncident] = (acc[inc.pincodeOfIncident] || 0) + 1;
//     return acc;
//   }, {});
//   const pincodeChartData = Object.keys(pincodeData).map((key) => ({
//     name: key,
//     value: pincodeData[key],
//   }));

//   // --- Status Summary ---
//   const statusData = [
//     { name: "Seen", value: incidents.filter((i) => i.isSeen).length },
//     { name: "New", value: incidents.filter((i) => !i.isSeen).length },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📊 Incident Analytics</h2>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "20px" }}>
        
//         {/* Category Distribution */}
//         <div>
//           <h3>Incidents by Category</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={categoryChartData} dataKey="value" nameKey="name" fill="#8884d8" label />
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pincode Distribution */}
//         <div>
//           <h3>Incidents by Pincode</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={pincodeChartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Status Summary */}
//         <div>
//           <h3>Status Overview</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={statusData} dataKey="value" nameKey="name" fill="#ff7300" label />
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  Tooltip, Legend, XAxis, YAxis, CartesianGrid, 
  ResponsiveContainer, Cell
} from "recharts";
import styles from "../styles/Authority.module.css";

export default function AuthorityAnalytics() {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all"); // all, week, month, year
  const [filteredIncidents, setFilteredIncidents] = useState([]);

  // Color palette for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  // Fetch incidents
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
  }, []);

  // Filter incidents by time range
  useEffect(() => {
    let filtered = incidents;
    const now = new Date();
    
    if (timeRange !== "all") {
      filtered = incidents.filter(incident => {
        const incidentDate = new Date(incident.createdAt || incident._id);
        const daysDiff = (now - incidentDate) / (1000 * 60 * 60 * 24);
        
        switch (timeRange) {
          case "week": return daysDiff <= 7;
          case "month": return daysDiff <= 30;
          case "year": return daysDiff <= 365;
          default: return true;
        }
      });
    }
    
    setFilteredIncidents(filtered);
  }, [incidents, timeRange]);

  // Calculate key metrics
  const calculateMetrics = () => {
    const total = filteredIncidents.length;
    const newCount = filteredIncidents.filter(inc => !inc.isSeen).length;
    const acknowledgedCount = filteredIncidents.filter(inc => inc.isSeen).length;
    const responseRate = total > 0 ? ((acknowledgedCount / total) * 100).toFixed(1) : 0;
    
    return { total, newCount, acknowledgedCount, responseRate };
  };

  // Category Distribution Data
  const getCategoryData = () => {
    const categoryData = filteredIncidents.reduce((acc, inc) => {
      acc[inc.category] = (acc[inc.category] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(categoryData).map((key) => ({
      name: key,
      value: categoryData[key],
      percentage: ((categoryData[key] / filteredIncidents.length) * 100).toFixed(1)
    })).sort((a, b) => b.value - a.value);
  };

  // Pincode Distribution Data (Top 10)
  const getPincodeData = () => {
    const pincodeData = filteredIncidents.reduce((acc, inc) => {
      acc[inc.pincodeOfIncident] = (acc[inc.pincodeOfIncident] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(pincodeData)
      .map((key) => ({
        name: key,
        incidents: pincodeData[key],
      }))
      .sort((a, b) => b.incidents - a.incidents)
      .slice(0, 10); // Top 10 pincodes
  };

  // Status Distribution Data
  const getStatusData = () => [
    { 
      name: "Acknowledged", 
      value: filteredIncidents.filter((i) => i.isSeen).length,
      color: "#00C49F"
    },
    { 
      name: "Pending", 
      value: filteredIncidents.filter((i) => !i.isSeen).length,
      color: "#FF8042"
    },
  ];

  // Daily Trends Data (Last 30 days)
  const getDailyTrendsData = () => {
    const last30Days = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last30Days.map(date => {
      const dayIncidents = filteredIncidents.filter(inc => {
        const incidentDate = new Date(inc.createdAt || inc._id).toISOString().split('T')[0];
        return incidentDate === date;
      });

      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        incidents: dayIncidents.length,
        acknowledged: dayIncidents.filter(inc => inc.isSeen).length
      };
    });
  };

  // Top Categories by Response Time (mock data - you can enhance this)
  const getResponseTimeData = () => {
    const categoryResponseTime = filteredIncidents
      .filter(inc => inc.isSeen)
      .reduce((acc, inc) => {
        if (!acc[inc.category]) {
          acc[inc.category] = { total: 0, count: 0 };
        }
        acc[inc.category].count++;
        return acc;
      }, {});

    return Object.keys(categoryResponseTime).map(category => ({
      category,
      avgResponseTime: Math.round(Math.random() * 24 + 1), // Mock data - replace with real calculation
      incidents: categoryResponseTime[category].count
    })).sort((a, b) => b.incidents - a.incidents).slice(0, 6);
  };

  const metrics = calculateMetrics();
  const categoryData = getCategoryData();
  const pincodeData = getPincodeData();
  const statusData = getStatusData();
  const trendsData = getDailyTrendsData();
  const responseTimeData = getResponseTimeData();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}>Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 className={styles.title}>📊 Incident Analytics</h2>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Time</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
          <Link to="/authority-dashboard" className={styles.analyticsLink}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className={styles.statsContainer} style={{ marginBottom: "40px" }}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{metrics.total}</div>
          <div className={styles.statLabel}>Total Incidents</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statNumber} ${styles.newCount}`}>{metrics.newCount}</div>
          <div className={styles.statLabel}>Pending Reports</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statNumber} ${styles.acknowledgedCount}`}>{metrics.acknowledgedCount}</div>
          <div className={styles.statLabel}>Acknowledged</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{metrics.responseRate}%</div>
          <div className={styles.statLabel}>Response Rate</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "30px" }}>
        
        {/* Category Distribution */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Incidents by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={categoryData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} incidents`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.chartSummary}>
            Most reported: <strong>{categoryData[0]?.name || 'N/A'}</strong> ({categoryData[0]?.value || 0} incidents)
          </div>
        </div>

        {/* Status Overview */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={statusData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100}
                label={({ value, name }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.chartSummary}>
            Response Rate: <strong>{metrics.responseRate}%</strong>
          </div>
        </div>

        {/* Top Affected Areas */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Top Affected Areas (by Pincode)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pincodeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip formatter={(value) => [`${value} incidents`, 'Incidents']} />
              <Bar dataKey="incidents" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.chartSummary}>
            Highest: <strong>{pincodeData[0]?.name || 'N/A'}</strong> ({pincodeData[0]?.incidents || 0} incidents)
          </div>
        </div>

        {/* Daily Trends */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Daily Incident Trends (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incidents" stroke="#8884d8" strokeWidth={2} name="Total Incidents" />
              <Line type="monotone" dataKey="acknowledged" stroke="#82ca9d" strokeWidth={2} name="Acknowledged" />
            </LineChart>
          </ResponsiveContainer>
          <div className={styles.chartSummary}>
            Avg daily incidents: <strong>{(filteredIncidents.length / 30).toFixed(1)}</strong>
          </div>
        </div>

        {/* Response Time by Category */}
        <div className={styles.chartCard} style={{ gridColumn: "1 / -1" }}>
          <h3 className={styles.chartTitle}>Category Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'incidents' ? `${value} incidents` : `${value}h avg response`,
                  name === 'incidents' ? 'Total Incidents' : 'Avg Response Time'
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="incidents" fill="#8884d8" name="Total Incidents" />
              <Bar yAxisId="right" dataKey="avgResponseTime" fill="#82ca9d" name="Avg Response Time (hours)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Insights */}
      <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef" }}>
        <h3 style={{ marginBottom: "15px", color: "#495057" }}>📈 Key Insights</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
          <div>
            <strong>Most Common Issue:</strong> {categoryData[0]?.name || 'No data'} 
            ({categoryData[0]?.value || 0} reports)
          </div>
          <div>
            <strong>Top Affected Area:</strong> Pincode {pincodeData[0]?.name || 'N/A'} 
            ({pincodeData[0]?.incidents || 0} incidents)
          </div>
          <div>
            <strong>Response Performance:</strong> {metrics.responseRate}% of incidents acknowledged
          </div>
          <div>
            <strong>Current Workload:</strong> {metrics.newCount} pending incidents requiring attention
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button 
          onClick={fetchIncidents}
          className={styles.refreshButton}
          style={{ padding: "12px 24px", fontSize: "16px" }}
        >
          🔄 Refresh Analytics
        </button>
        <div style={{ marginTop: "10px", color: "#6c757d", fontSize: "14px" }}>
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { useComplaints } from "@/contexts/ComplaintContext";
// import {
//   zones,
//   categoryLabels,
//   priorityLabels,
//   statusLabels,
//   peopleAffectedLabels,
//   Complaint,
// } from "@/data/dummyData";
// import ComplaintCard from "@/components/ComplaintCard";
// import {
//   Filter,
//   X,
//   Eye,
//   RefreshCw,
//   MapPin,
//   AlertTriangle,
//   CheckCircle,
//   ExternalLink,
//   Image,
// } from "lucide-react";
// import { toast } from "sonner";

// const ADMIN_EMAIL = "admin@citypulse.com";

// const AdminDashboard: React.FC = () => {
//   const { user, loading } = useAuth();
//   const { complaints, updateComplaintStatus, getFilteredComplaints } =
//     useComplaints();

//   // 🚨 Wait for Firebase auth to load
//   if (loading) return null;

//   // 🚫 Not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🚫 Logged in but not admin
//   if (user.email !== ADMIN_EMAIL) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // Filters
//   const [zoneFilter, setZoneFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   // Modals
//   const [selectedComplaint, setSelectedComplaint] =
//     useState<Complaint | null>(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const filteredComplaints = getFilteredComplaints({
//     zone: zoneFilter || undefined,
//     category: categoryFilter || undefined,
//   });

//   const stats = {
//     total: complaints.length,
//     pending: complaints.filter((c) => c.status === "pending").length,
//     progress: complaints.filter((c) => c.status === "progress").length,
//     resolved: complaints.filter((c) => c.status === "resolved").length,
//     critical: complaints.filter((c) => c.priority === "Critical").length,
//   };

//   const handleStatusUpdate = async (status: Complaint["status"]) => {
//     if (!selectedComplaint) return;
//     await updateComplaintStatus(selectedComplaint.id, status);
//     toast.success(`Status updated to ${statusLabels[status]}`);
//     setShowStatusModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-background py-8 px-4">
//       <div className="container mx-auto max-w-7xl">
//         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//           {[
//             { label: "Total", value: stats.total },
//             { label: "Pending", value: stats.pending },
//             { label: "In Progress", value: stats.progress },
//             { label: "Resolved", value: stats.resolved },
//             { label: "Critical", value: stats.critical },
//           ].map((s) => (
//             <div
//               key={s.label}
//               className="bg-card p-4 rounded-xl border shadow"
//             >
//               <p className="text-2xl font-bold">{s.value}</p>
//               <p className="text-sm text-muted-foreground">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Complaints */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredComplaints.map((complaint) => (
//             <ComplaintCard
//               key={complaint.id}
//               complaint={complaint}
//               showActions
//               onViewDetails={() => {
//                 setSelectedComplaint(complaint);
//                 setShowDetailModal(true);
//               }}
//               onUpdateStatus={() => {
//                 setSelectedComplaint(complaint);
//                 setShowStatusModal(true);
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Status Modal */}
//       {showStatusModal && selectedComplaint && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-card p-6 rounded-xl w-80">
//             <h2 className="font-bold mb-4">Update Status</h2>
//             {(["pending", "progress", "resolved"] as const).map((s) => (
//               <button
//                 key={s}
//                 onClick={() => handleStatusUpdate(s)}
//                 className="w-full mb-2 py-2 rounded bg-primary text-white"
//               >
//                 {statusLabels[s]}
//               </button>
//             ))}
//             <button
//               onClick={() => setShowStatusModal(false)}
//               className="w-full py-2 border rounded mt-2"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { useComplaints } from "@/contexts/ComplaintContext";
// import {
//   zones,
//   categoryLabels,
//   priorityLabels,
//   statusLabels,
//   peopleAffectedLabels,
//   Complaint,
// } from "@/data/dummyData";
// import ComplaintCard from "@/components/ComplaintCard";
// import { toast } from "sonner";

// const ADMIN_EMAIL = "admin@citypulse.com";

// const AdminDashboard: React.FC = () => {
//   const { user, loading } = useAuth();
//   const { complaints, updateComplaintStatus, getFilteredComplaints } = useComplaints();

//   if (loading) return null;

//   if (!user) return <Navigate to="/login" replace />;

//   if (user.email !== ADMIN_EMAIL) return <Navigate to="/dashboard" replace />;

//   // Filters
//   const [zoneFilter, setZoneFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   // Modals
//   const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);

//   const filteredComplaints = getFilteredComplaints({
//     zone: zoneFilter || undefined,
//     category: categoryFilter || undefined,
//   });

//   const stats = {
//     total: complaints.length,
//     pending: complaints.filter((c) => c.status === "pending").length,
//     progress: complaints.filter((c) => c.status === "progress").length,
//     resolved: complaints.filter((c) => c.status === "resolved").length,
//     critical: complaints.filter((c) => c.priority === "Critical").length,
//   };

//   const handleStatusUpdate = async (status: Complaint["status"]) => {
//     if (!selectedComplaint) return;
//     await updateComplaintStatus(selectedComplaint.id, status);
//     toast.success(`Status updated to ${statusLabels[status]}`);
//     setShowStatusModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-background py-8 px-4">
//       <div className="container mx-auto max-w-7xl">
//         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//           {[{ label: "Total", value: stats.total },
//             { label: "Pending", value: stats.pending },
//             { label: "In Progress", value: stats.progress },
//             { label: "Resolved", value: stats.resolved },
//             { label: "Critical", value: stats.critical },
//           ].map((s) => (
//             <div key={s.label} className="bg-card p-4 rounded-xl border shadow">
//               <p className="text-2xl font-bold">{s.value}</p>
//               <p className="text-sm text-muted-foreground">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Complaints */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredComplaints.map((complaint) => (
//             <ComplaintCard
//               key={complaint.id}
//               complaint={complaint}
//               showActions
//               onUpdateStatus={() => {
//                 setSelectedComplaint(complaint);
//                 setShowStatusModal(true);
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Status Modal */}
//       {showStatusModal && selectedComplaint && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-card p-6 rounded-xl w-80">
//             <h2 className="font-bold mb-4">Update Status</h2>
//             {(["pending", "progress", "resolved"] as const).map((s) => (
//               <button
//                 key={s}
//                 onClick={() => handleStatusUpdate(s)}
//                 className="w-full mb-2 py-2 rounded bg-primary text-white"
//               >
//                 {statusLabels[s]}
//               </button>
//             ))}
//             <button
//               onClick={() => setShowStatusModal(false)}
//               className="w-full py-2 border rounded mt-2"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useComplaints } from "@/contexts/ComplaintContext";
import ComplaintCard from "@/components/ComplaintCard";
import { zones, statusLabels, Complaint } from "@/data/dummyData";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@citypulse.com";


const priorityOrder: Record<string, number> = {
  Critical: 1,
  High: 2,
  Medium: 3,
  Low: 4,
};

const categoryLabels: Record<string, string> = {
  water: "Water Supply",
  electricity: "Electricity",
  roads: "Roads",
  sanitation: "Sanitation",
  other: "Other",
};

const peopleAffectedLabels: Record<string, string> = {
  "1-10": "1–10 People",
  "10-50": "10–50 People",
  "50-100": "50–100 People",
  "100+": "100+ People",
};

const priorityLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const { complaints, updateComplaintStatus, getFilteredComplaints } =
    useComplaints();

  const [zoneFilter, setZoneFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.email !== ADMIN_EMAIL)
    return <Navigate to="/dashboard" replace />;

  // Filter + sort
  const filteredComplaints = useMemo(() => {
    const list = getFilteredComplaints({
      zone: zoneFilter || undefined,
      category: categoryFilter || undefined,
    });

    return [...list].sort(
      (a, b) =>
        (priorityOrder[a.priority] || 5) -
        (priorityOrder[b.priority] || 5)
    );
  }, [complaints, zoneFilter, categoryFilter, getFilteredComplaints]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    progress: complaints.filter((c) => c.status === "progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
    critical: complaints.filter((c) => c.priority === "Critical").length,
  };

  const handleStatusUpdate = async (status: Complaint["status"]) => {
    if (!selectedComplaint) return;
    await updateComplaintStatus(selectedComplaint.id, status);
    toast.success(`Status updated to ${statusLabels[status]}`);
    setShowStatusModal(false);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total },
            { label: "Pending", value: stats.pending },
            { label: "In Progress", value: stats.progress },
            { label: "Resolved", value: stats.resolved },
            { label: "Critical", value: stats.critical },
          ].map((s) => (
            <div key={s.label} className="bg-card p-4 rounded-xl border shadow">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Zones</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="water">Water Supply</option>
            <option value="electricity">Electricity</option>
            <option value="roads">Roads</option>
            <option value="sanitation">Sanitation</option>
            <option value="other">Public Safety / Other</option>
          </select>
        </div>

        {/* Complaints */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              showActions
              onViewDetails={() => {
                setSelectedComplaint(complaint);
                setShowDetailModal(true);
              }}
              onUpdateStatus={() => {
                setSelectedComplaint(complaint);
                setShowStatusModal(true);
              }}
            />
          ))}

          {filteredComplaints.length === 0 && (
            <p className="text-center col-span-full text-muted-foreground">
              No complaints found for selected filters.
            </p>
          )}
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-card p-6 rounded-xl w-80">
            <h2 className="font-bold mb-4">Update Status</h2>
            {(["pending", "progress", "resolved"] as const).map((s) => (
              <button
                key={s}
                onClick={() => handleStatusUpdate(s)}
                className="w-full mb-2 py-2 rounded bg-primary text-white"
              >
                {statusLabels[s]}
              </button>
            ))}
            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full py-2 border rounded mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Complaint Details</h2>

            <div className="space-y-2 text-sm">
              <p><strong>Title:</strong> {selectedComplaint.title}</p>
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              <p><strong>Category:</strong> {categoryLabels[selectedComplaint.category]}</p>
              <p><strong>People Affected:</strong> {peopleAffectedLabels[selectedComplaint.peopleAffected]}</p>
              <p><strong>Zone:</strong> {selectedComplaint.zone}</p>
              <p><strong>Status:</strong> {statusLabels[selectedComplaint.status]}</p>
              <p><strong>Priority:</strong> {priorityLabels[selectedComplaint.priority]}</p>

              <p>
                <strong>Location:</strong>{" "}
                <a
                  href={selectedComplaint.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Open in Maps
                </a>
              </p>

              {selectedComplaint.imageUrl && (
                <img
                  src={selectedComplaint.imageUrl}
                  alt="Complaint"
                  className="rounded-lg w-full max-h-64 object-cover mt-4"
                />
              )}
            </div>

            <button
              onClick={() => setShowDetailModal(false)}
              className="mt-6 w-full py-2 border rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;


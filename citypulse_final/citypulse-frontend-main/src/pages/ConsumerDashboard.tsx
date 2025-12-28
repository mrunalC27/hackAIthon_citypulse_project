// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { useComplaints } from '@/contexts/ComplaintContext';
// import ComplaintCard from '@/components/ComplaintCard';
// import ComplaintForm from '@/components/ComplaintForm';
// import { PenSquare, FolderOpen, Plus } from 'lucide-react';

// const ConsumerDashboard: React.FC = () => {
//   const { user, loading } = useAuth();
//   const { getComplaintsByUser } = useComplaints();
//   const [showComplaintForm, setShowComplaintForm] = useState(false);

//   if (loading) return null; // Wait for auth to load

//   if (!user) return <Navigate to="/login" replace />;

//   if (user.email === "admin@citypulse.com") return <Navigate to="/admin" replace />;

//   const userComplaints = getComplaintsByUser(user.uid);

//   return (
//     <div className="min-h-screen bg-background py-8 px-4">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
//             Welcome, {user.displayName || user.email}
//           </h1>
//           <p className="text-muted-foreground">
//             Manage your civic complaints and track their status
//           </p>
//         </div>

//         {/* Action Cards */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           {/* Submit Complaint Card */}
//           <button
//             onClick={() => setShowComplaintForm(true)}
//             className="bg-card rounded-2xl border border-border shadow-card p-6 text-left card-hover group"
//           >
//             <div className="flex items-start gap-4">
//               <div className="p-4 rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
//                 <PenSquare className="w-8 h-8" />
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold text-foreground mb-2">Submit a Complaint</h2>
//                 <p className="text-muted-foreground text-sm">
//                   Report a civic issue in your area. Provide details about the problem and we'll prioritize it.
//                 </p>
//               </div>
//               <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
//             </div>
//           </button>

//           {/* My Complaints Card */}
//           <div className="bg-card rounded-2xl border border-border shadow-card p-6">
//             <div className="flex items-start gap-4">
//               <div className="p-4 rounded-xl bg-accent text-accent-foreground">
//                 <FolderOpen className="w-8 h-8" />
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold text-foreground mb-2">My Complaints</h2>
//                 <p className="text-muted-foreground text-sm">
//                   You have submitted {userComplaints.length} complaint{userComplaints.length !== 1 ? 's' : ''}.
//                 </p>
//                 <div className="flex gap-4 mt-3 text-sm">
//                   <span className="text-status-pending">
//                     {userComplaints.filter(c => c.status === 'pending').length} Pending
//                   </span>
//                   <span className="text-status-progress">
//                     {userComplaints.filter(c => c.status === 'progress').length} In Progress
//                   </span>
//                   <span className="text-status-resolved">
//                     {userComplaints.filter(c => c.status === 'resolved').length} Resolved
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Complaints List */}
//         <div className="bg-card rounded-2xl border border-border shadow-card p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-foreground">Your Complaints</h2>
//             <button
//               onClick={() => setShowComplaintForm(true)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors btn-hover"
//             >
//               <Plus className="w-4 h-4" />
//               New Complaint
//             </button>
//           </div>

//           {userComplaints.length === 0 ? (
//             <div className="text-center py-12">
//               <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-foreground mb-2">No complaints yet</h3>
//               <p className="text-muted-foreground mb-6">
//                 You haven't submitted any complaints. Click the button above to report an issue.
//               </p>
//               <button
//                 onClick={() => setShowComplaintForm(true)}
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors btn-hover"
//               >
//                 <Plus className="w-4 h-4" />
//                 Submit Your First Complaint
//               </button>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {userComplaints.map((complaint, index) => (
//                 <div 
//                   key={complaint.id} 
//                   className="animate-fade-in"
//                   style={{ animationDelay: `${0.05 * index}s` }}
//                 >
//                   <ComplaintCard complaint={complaint} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Complaint Form Modal */}
//       {showComplaintForm && (
//         <ComplaintForm onClose={() => setShowComplaintForm(false)} />
//       )}
//     </div>
//   );
// };

// export default ConsumerDashboard;
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import ComplaintCard from '@/components/ComplaintCard';
import ComplaintForm from '@/components/ComplaintForm';
import { PenSquare, FolderOpen, Plus } from 'lucide-react';

const ConsumerDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const { getComplaintsByUser } = useComplaints();
  const [showComplaintForm, setShowComplaintForm] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.email === "admin@citypulse.com") return <Navigate to="/admin" replace />;

  const userComplaints = getComplaintsByUser(user.uid);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome, {user.displayName || user.email}
          </h1>
          <p className="text-muted-foreground">
            Manage your civic complaints and track their status
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setShowComplaintForm(true)}
            className="bg-card rounded-2xl border border-border shadow-card p-6 text-left card-hover group"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                <PenSquare className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">Submit a Complaint</h2>
                <p className="text-muted-foreground text-sm">
                  Report a civic issue in your area.
                </p>
              </div>
              <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>

          <div className="bg-card rounded-2xl border border-border shadow-card p-6">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-accent text-accent-foreground">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">My Complaints</h2>
                <p className="text-muted-foreground text-sm">
                  You have submitted {userComplaints.length} complaint{userComplaints.length !== 1 ? 's' : ''}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-6">
          {userComplaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userComplaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)}
            </div>
          )}
        </div>
      </div>

      {showComplaintForm && <ComplaintForm onClose={() => setShowComplaintForm(false)} />}
    </div>
  );
};

export default ConsumerDashboard;

import React from 'react';
import { Complaint, categoryLabels, priorityLabels, statusLabels } from '@/data/dummyData';
import { Droplets, Zap, Car, Trash2, HelpCircle, MapPin } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  showActions?: boolean;
  onViewDetails?: () => void;
  onUpdateStatus?: () => void;
  onAssignTeam?: () => void;
  onViewLocation?: () => void;
}

const categoryIcons: Record<Complaint['category'], React.ReactNode> = {
  water: <Droplets className="w-4 h-4" />,
  electricity: <Zap className="w-4 h-4" />,
  roads: <Car className="w-4 h-4" />,
  sanitation: <Trash2 className="w-4 h-4" />,
  other: <HelpCircle className="w-4 h-4" />,
};

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  showActions = false,
  onViewDetails,
  onUpdateStatus,
  onAssignTeam,
  onViewLocation,
}) => {
  const getPriorityClass = (priority: Complaint['priority']) => {
    const classes = {
      Low: 'priority-low',
      Medium: 'priority-medium',
      High: 'priority-high',
      Critical: 'priority-critical',
    };
    return classes[priority];
  };

  const getStatusClass = (status: Complaint['status']) => {
    const classes = {
      pending: 'status-pending',
      progress: 'status-progress',
      resolved: 'status-resolved',
    };
    return classes[status];
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-5 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent text-accent-foreground">
            {categoryIcons[complaint.category]}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">#{complaint.id}</p>
            <h3 className="font-semibold text-foreground line-clamp-1">{complaint.title}</h3>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`priority-badge ${getPriorityClass(complaint.priority)}`}>
          {priorityLabels[complaint.priority]}
        </span>
        <span className={`priority-badge ${getStatusClass(complaint.status)}`}>
          {statusLabels[complaint.status]}
        </span>
        <span className="priority-badge bg-secondary text-secondary-foreground">
          {categoryLabels[complaint.category]}
        </span>
      </div>

      {/* Details */}
      {showActions && (
        <div className="text-sm text-muted-foreground mb-3">
          <p><span className="font-medium">User:</span> {complaint.userName}</p>
          <p className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {complaint.location}
          </p>
        </div>
      )}

      {/* Description for consumer view */}
      {!showActions && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {complaint.description}
        </p>
      )}

      {/* Location */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <MapPin className="w-3 h-3" />
        <span className="line-clamp-1">{complaint.location}</span>
      </div>

      {/* Action Buttons for Admin */}
      {showActions && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onViewDetails}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors btn-hover"
          >
            View Details
          </button>
          <button
            onClick={onUpdateStatus}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors btn-hover"
          >
            Update Status
          </button>
          <button
            onClick={onAssignTeam}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-border text-foreground hover:bg-secondary transition-colors btn-hover"
          >
            Assign Team
          </button>
          <button
            onClick={onViewLocation}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-border text-foreground hover:bg-secondary transition-colors btn-hover"
          >
            View Location
          </button>
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
        Submitted: {complaint.createdAt}
      </p>
    </div>
  );
};




export default ComplaintCard;

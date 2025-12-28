// Dummy data for CityPulse - Replace with Firebase integration

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: 'water' | 'electricity' | 'roads' | 'sanitation' | 'other';
  peopleAffected: '1-10' | '10-50' | '50-100' | '100+';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'progress' | 'resolved';
  location: string; // Google Maps URL
  zone: string;
  imageUrl?: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  password: string; // In real app, never store plain passwords
  role: 'consumer' | 'admin';
}

// Dummy users - Firebase: Replace with Firebase Auth
export const dummyUsers: User[] = [
  { id: 'user1', username: 'john_citizen', password: 'password123', role: 'consumer' },
  { id: 'user2', username: 'jane_resident', password: 'password123', role: 'consumer' },
  { id: 'admin1', username: 'admin', password: 'admin123', role: 'admin' }, // Admin account is fixed and predefined
];

// Dummy complaints - Firebase: Replace with Firestore collection
export const dummyComplaints: Complaint[] = [
  {
    id: 'CMP001',
    userId: 'user1',
    userName: 'john_citizen',
    title: 'Water Supply Disruption in Block A',
    description: 'No water supply for the past 3 days. Multiple households affected near the hospital.',
    category: 'water',
    peopleAffected: '50-100',
    priority: 'High',
    status: 'progress',
    location: 'https://www.google.com/maps?q=28.6139,77.2090',
    zone: 'North Zone',
    createdAt: '2024-01-15',
  },
  {
    id: 'CMP002',
    userId: 'user1',
    userName: 'john_citizen',
    title: 'Gas Leak on Main Road',
    description: 'Dangerous gas leak detected near the school. Immediate attention required.',
    category: 'other',
    peopleAffected: '100+',
    priority: 'Critical',
    status: 'pending',
    location: 'https://www.google.com/maps?q=28.6129,77.2295',
    zone: 'East Zone',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
    createdAt: '2024-01-18',
  },
  {
    id: 'CMP003',
    userId: 'user2',
    userName: 'jane_resident',
    title: 'Street Light Not Working',
    description: 'Street light outside house number 45 has been non-functional for a week.',
    category: 'electricity',
    peopleAffected: '1-10',
    priority: 'Low',
    status: 'resolved',
    location: 'https://www.google.com/maps?q=28.5355,77.2910',
    zone: 'South Zone',
    createdAt: '2024-01-10',
  },
  {
    id: 'CMP004',
    userId: 'user2',
    userName: 'jane_resident',
    title: 'Garbage Collection Delayed',
    description: 'Garbage not collected for 5 days. Health hazard developing.',
    category: 'sanitation',
    peopleAffected: '10-50',
    priority: 'Medium',
    status: 'progress',
    location: 'https://www.google.com/maps?q=28.4595,77.0266',
    zone: 'West Zone',
    createdAt: '2024-01-20',
  },
  {
    id: 'CMP005',
    userId: 'user1',
    userName: 'john_citizen',
    title: 'Electric Hazard Near Market',
    description: 'Exposed electrical wires on main road causing electric hazard near the market area.',
    category: 'electricity',
    peopleAffected: '100+',
    priority: 'Critical',
    status: 'pending',
    location: 'https://www.google.com/maps?q=28.6304,77.2177',
    zone: 'Central Zone',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    createdAt: '2024-01-22',
  },
];

// Category labels
export const categoryLabels: Record<Complaint['category'], string> = {
  water: 'Water Supply',
  electricity: 'Electricity',
  roads: 'Roads',
  sanitation: 'Sanitation',
  other: 'Public Safety',
};

// Priority labels
export const priorityLabels: Record<Complaint['priority'], string> = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Critical: 'Critical',
};

// Status labels
export const statusLabels: Record<Complaint['status'], string> = {
  pending: 'Pending',
  progress: 'In Progress',
  resolved: 'Resolved',
};

// Zone options
export const zones = ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'];

// People affected labels
export const peopleAffectedLabels: Record<Complaint['peopleAffected'], string> = {
  '1-10': '1-10 people',
  '10-50': '10-50 people',
  '50-100': '50-100 people',
  '100+': '100+ people',
};

export type Complaints = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: "pending" | "progress" | "resolved";
  zone: string;
  peopleAffected: string;
  location: string;
  imageUrl?: string;

  assignedTeam?: string; // 👈 ADD THIS
};


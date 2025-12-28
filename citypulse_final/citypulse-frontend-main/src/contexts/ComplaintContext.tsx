// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { Complaint, dummyComplaints } from '@/data/dummyData';
// import { db} from '@/lib/firebase';
// import { collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
// import { calculatePriority } from '@/lib/priorityAlgorithm';
// import { uploadToCloudinary } from "@/lib/cloudinary";

// interface ComplaintInput {
//   userId: string;
//   userName: string;
//   title: string;
//   description: string;
//   category: 'water' | 'electricity' | 'roads' | 'sanitation' | 'other';
//   peopleAffected: '1-10' | '10-50' | '50-100' | '100+';
//   location: string;
//   zone: string;
//   status: 'pending' | 'progress' | 'resolved';
//   imageFile?: File;
// }

// interface ComplaintFilters {
//   zone?: string;
//   category?: string;
// }

// interface ComplaintContextType {
//   complaints: Complaint[];
//   addComplaint: (complaint: ComplaintInput) => Promise<void>;
//   updateComplaintStatus: (id: string, status: Complaint['status']) => Promise<void>;
//   getComplaintsByUser: (userId: string) => Complaint[];
//   getFilteredComplaints: (filters: ComplaintFilters) => Complaint[];
//   loading: boolean;
// }

// const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

// export const ComplaintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [complaints, setComplaints] = useState<Complaint[]>(dummyComplaints);
//   const [loading, setLoading] = useState(false);

//   // Listen to Firestore complaints collection
//   useEffect(() => {
//     try {
//       const complaintsRef = collection(db, 'complaints');
//       const q = query(complaintsRef, orderBy('createdAt', 'desc'));
      
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         if (!snapshot.empty) {
//           const firestoreComplaints: Complaint[] = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           })) as Complaint[];
//           setComplaints(firestoreComplaints);
//         }
//       }, (error) => {
//         console.log('Firestore not configured, using dummy data:', error.message);
//       });

//       return () => unsubscribe();
//     } catch (error) {
//       console.log('Firestore initialization skipped, using dummy data');
//     }
//   }, []);

//   const uploadImage = async (file: File): Promise<string> => {
//   return await uploadToCloudinary(file);
// };


//   const addComplaint = async (complaint: ComplaintInput) => {
//     setLoading(true);
    
//     try {
//       // Calculate priority automatically
//       const priority = calculatePriority({
//         description: complaint.description,
//         category: complaint.category === 'water' ? 'Water Supply' :
//                   complaint.category === 'electricity' ? 'Electricity' :
//                   complaint.category === 'roads' ? 'Roads' :
//                   complaint.category === 'sanitation' ? 'Sanitation' : 'Public Safety',
//         peopleAffected: complaint.peopleAffected,
//         hasImage: !!complaint.imageFile,
//         location: complaint.location,
//       });

//       let imageUrl: string | undefined;
      
//       // Upload image if provided
//       if (complaint.imageFile) {
//         try {
//           imageUrl = await uploadImage(complaint.imageFile);
//         } catch (error) {
//           console.log('Image upload failed, continuing without image');
//         }
//       }

//       const newComplaintData = {
//         userId: complaint.userId,
//         userName: complaint.userName,
//         title: complaint.title,
//         description: complaint.description,
//         category: complaint.category,
//         peopleAffected: complaint.peopleAffected,
//         priority,
//         location: complaint.location,
//         zone: complaint.zone,
//         status: complaint.status,
//         imageUrl,
//         createdAt: new Date().toISOString().split('T')[0],
//       };

//       try {
//         // Try to add to Firestore
//         await addDoc(collection(db, 'complaints'), newComplaintData);
//       } catch (error) {
//         // Fallback to local state if Firestore is not configured
//         const newComplaint: Complaint = {
//           ...newComplaintData,
//           id: `CMP${String(complaints.length + 1).padStart(3, '0')}`,
//         };
//         setComplaints((prev) => [newComplaint, ...prev]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateComplaintStatus = async (id: string, status: Complaint['status']) => {
//     try {
//       // Try to update in Firestore
//       const complaintRef = doc(db, 'complaints', id);
//       await updateDoc(complaintRef, { status });
//     } catch (error) {
//       // Fallback to local state
//       setComplaints((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, status } : c))
//       );
//     }
//   };

//   const getComplaintsByUser = (userId: string): Complaint[] => {
//     return complaints.filter((c) => c.userId === userId);
//   };

//   const getFilteredComplaints = (filters: ComplaintFilters): Complaint[] => {
//     return complaints.filter((c) => {
//       if (filters.zone && c.zone !== filters.zone) return false;
//       if (filters.category && c.category !== filters.category) return false;
//       return true;
//     });
//   };

//   return (
//     <ComplaintContext.Provider
//       value={{
//         complaints,
//         addComplaint,
//         updateComplaintStatus,
//         getComplaintsByUser,
//         getFilteredComplaints,
//         loading,
//       }}
//     >
//       {children}
//     </ComplaintContext.Provider>
//   );
// };

// export const useComplaints = () => {
//   const context = useContext(ComplaintContext);
//   if (context === undefined) {
//     throw new Error('useComplaints must be used within a ComplaintProvider');
//   }
//   return context;
// };
// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { Complaint, dummyComplaints } from '@/data/dummyData';
// import { db } from '@/lib/firebase';
// import { collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
// import { calculatePriority } from '@/lib/priorityAlgorithm';
// import { uploadToCloudinary } from '@/lib/cloudinary';

// interface ComplaintInput {
//   userId: string;
//   userName: string;
//   title: string;
//   description: string;
//   category: 'water' | 'electricity' | 'roads' | 'sanitation' | 'other';
//   peopleAffected: '1-10' | '10-50' | '50-100' | '100+';
//   location: string;
//   zone: string;
//   status: 'pending' | 'progress' | 'resolved';
//   imageFile?: File;
// }

// interface ComplaintFilters {
//   zone?: string;
//   category?: string;
// }

// interface ComplaintContextType {
//   complaints: Complaint[];
//   addComplaint: (complaint: ComplaintInput) => Promise<void>;
//   updateComplaintStatus: (id: string, status: Complaint['status']) => Promise<void>;
//   getComplaintsByUser: (userId: string) => Complaint[];
//   getFilteredComplaints: (filters: ComplaintFilters) => Complaint[];
//   loading: boolean;
// }

// const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

// export const ComplaintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [loading, setLoading] = useState(false);

//  useEffect(() => {
//   const complaintsRef = collection(db, 'complaints');
//   const q = query(complaintsRef, orderBy('createdAt', 'desc'));

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     if (!snapshot.empty) {
//       const firestoreComplaints: Complaint[] = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Complaint[];
//       setComplaints(firestoreComplaints);
//     }
//   });

//   return () => unsubscribe();
// }, []);


//   const uploadImage = async (file: File): Promise<string> => {
//     return await uploadToCloudinary(file);
//   };

//   const addComplaint = async (complaint: ComplaintInput) => {
//     setLoading(true);
//     try {
//       const priority = calculatePriority({
//         description: complaint.description,
//         category: complaint.category === 'water' ? 'Water Supply' :
//                   complaint.category === 'electricity' ? 'Electricity' :
//                   complaint.category === 'roads' ? 'Roads' :
//                   complaint.category === 'sanitation' ? 'Sanitation' : 'Public Safety',
//         peopleAffected: complaint.peopleAffected,
//         hasImage: !!complaint.imageFile,
//         location: complaint.location,
//       });

//       let imageUrl: string | undefined;
//       if (complaint.imageFile) {
//         try {
//           imageUrl = await uploadImage(complaint.imageFile);
//         } catch (error) {
//           console.log('Image upload failed, continuing without image');
//         }
//       }

//       const newComplaintData = {
//         userId: complaint.userId,
//         userName: complaint.userName,
//         title: complaint.title,
//         description: complaint.description,
//         category: complaint.category,
//         peopleAffected: complaint.peopleAffected,
//         priority,
//         location: complaint.location,
//         zone: complaint.zone,
//         status: complaint.status,
//         imageUrl: imageUrl || null,
//         createdAt: serverTimestamp(), // Firestore timestamp
//       };

//       await addDoc(collection(db, 'complaints'), newComplaintData);
//     } catch (error) {
//       console.error('Add complaint failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateComplaintStatus = async (id: string, status: Complaint['status']) => {
//     try {
//       const complaintRef = doc(db, 'complaints', id);
//       await updateDoc(complaintRef, { status });
//     } catch (error) {
//       console.error('Update status failed:', error);
//       setComplaints((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, status } : c))
//       );
//     }
//   };

//   const getComplaintsByUser = (userId: string) =>
//     complaints.filter((c) => c.userId === userId);

//   const getFilteredComplaints = (filters: ComplaintFilters) =>
//     complaints.filter((c) => {
//       if (filters.zone && c.zone !== filters.zone) return false;
//       if (filters.category && c.category !== filters.category) return false;
//       return true;
//     });

//   return (
//     <ComplaintContext.Provider
//       value={{
//         complaints,
//         addComplaint,
//         updateComplaintStatus,
//         getComplaintsByUser,
//         getFilteredComplaints,
//         loading,
//       }}
//     >
//       {children}
//     </ComplaintContext.Provider>
//   );
// };

// export const useComplaints = () => {
//   const context = useContext(ComplaintContext);
//   if (!context) throw new Error('useComplaints must be used within a ComplaintProvider');
//   return context;
// };



import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Complaint } from '@/data/dummyData';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { calculatePriority } from '@/lib/priorityAlgorithm';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ComplaintInput {
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: 'water' | 'electricity' | 'roads' | 'sanitation' | 'other';
  peopleAffected: '1-10' | '10-50' | '50-100' | '100+';
  location: string;
  zone: string;
  status: 'pending' | 'progress' | 'resolved';
  imageFile?: File;
}

interface ComplaintFilters {
  zone?: string;
  category?: string;
}

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (complaint: ComplaintInput) => Promise<void>;
  updateComplaintStatus: (id: string, status: Complaint['status']) => Promise<void>;
  getComplaintsByUser: (userId: string) => Complaint[];
  getFilteredComplaints: (filters: ComplaintFilters) => Complaint[];
  loading: boolean;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  // Listen to Firestore in real-time
  useEffect(() => {
    const complaintsRef = collection(db, 'complaints');
    const q = query(complaintsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firestoreComplaints: Complaint[] = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            title: data.title,
            description: data.description,
            category: data.category,
            peopleAffected: data.peopleAffected,
            location: data.location,
            zone: data.zone,
            status: data.status,
            priority: data.priority,
            imageUrl: data.imageUrl || null,
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt.toDate().toISOString()
                : new Date().toISOString(),
          };
        });
        setComplaints(firestoreComplaints);
      },
      (error) => {
        console.error('Firestore snapshot error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const uploadImage = async (file: File): Promise<string> => {
    return await uploadToCloudinary(file);
  };

  const addComplaint = async (complaint: ComplaintInput) => {
    setLoading(true);
    try {
      const priority = calculatePriority({
        description: complaint.description,
        category:
          complaint.category === 'water'
            ? 'Water Supply'
            : complaint.category === 'electricity'
            ? 'Electricity'
            : complaint.category === 'roads'
            ? 'Roads'
            : complaint.category === 'sanitation'
            ? 'Sanitation'
            : 'Public Safety',
        peopleAffected: complaint.peopleAffected,
        hasImage: !!complaint.imageFile,
        location: complaint.location,
      });

      let imageUrl: string | null = null;
      if (complaint.imageFile) {
        try {
          imageUrl = await uploadImage(complaint.imageFile);
        } catch (error) {
          console.warn('Image upload failed, continuing without image');
        }
      }

      const newComplaintData = {
        userId: complaint.userId,
        userName: complaint.userName,
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        peopleAffected: complaint.peopleAffected,
        priority,
        location: complaint.location,
        zone: complaint.zone,
        status: complaint.status,
        imageUrl,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'complaints'), newComplaintData);
    } catch (error) {
      console.error('Add complaint failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (id: string, status: Complaint['status']) => {
    try {
      const complaintRef = doc(db, 'complaints', id);
      await updateDoc(complaintRef, { status });
    } catch (error) {
      console.error('Update status failed:', error);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    }
  };

  const getComplaintsByUser = (userId: string) =>
    complaints.filter((c) => c.userId === userId);

  const getFilteredComplaints = (filters: ComplaintFilters) =>
    complaints.filter((c) => {
      if (filters.zone && c.zone !== filters.zone) return false;
      if (filters.category && c.category !== filters.category) return false;
      return true;
    });

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        getComplaintsByUser,
        getFilteredComplaints,
        loading,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) throw new Error('useComplaints must be used within a ComplaintProvider');
  return context;
};


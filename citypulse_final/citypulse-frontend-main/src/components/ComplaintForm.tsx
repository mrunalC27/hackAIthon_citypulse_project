// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useComplaints } from '@/contexts/ComplaintContext';
// import { zones } from '@/data/dummyData';
// import { X, Upload, Send, MapPin } from 'lucide-react';
// import { toast } from 'sonner';

// interface ComplaintFormProps {
//   onClose: () => void;
// }

// const ComplaintForm: React.FC<ComplaintFormProps> = ({ onClose }) => {
//   const { currentUser } = useAuth();
//   const { addComplaint } = useComplaints();

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '' as 'water' | 'electricity' | 'roads' | 'sanitation' | 'other' | '',
//     peopleAffected: '' as '1-10' | '10-50' | '50-100' | '100+' | '',
//     location: '',
//     zone: '',
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const isValidGoogleMapsUrl = (url: string) => {
//     return url.includes('google.com/maps') || url.includes('maps.google.com') || url.includes('goo.gl/maps');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!currentUser) return;
    
//     // Validate required fields
//     if (!formData.title || !formData.description || !formData.category || 
//         !formData.peopleAffected || !formData.location || !formData.zone) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     // Validate Google Maps URL
//     if (!isValidGoogleMapsUrl(formData.location)) {
//       toast.error('Please enter a valid Google Maps URL');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await addComplaint({
//         userId: currentUser.id,
//         userName: currentUser.username,
//         title: formData.title,
//         description: formData.description,
//         category: formData.category as 'water' | 'electricity' | 'roads' | 'sanitation' | 'other',
//         peopleAffected: formData.peopleAffected as '1-10' | '10-50' | '50-100' | '100+',
//         location: formData.location,
//         zone: formData.zone,
//         status: 'pending',
//         imageFile: imageFile || undefined,
//       });

//       toast.success('Complaint submitted successfully!');
//       onClose();
//     } catch (error) {
//       toast.error('Failed to submit complaint. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
//       <div className="bg-card rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
//         {/* Header */}
//         <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
//           <h2 className="text-xl font-bold text-foreground">Submit a Complaint</h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-secondary transition-colors"
//           >
//             <X className="w-5 h-5 text-muted-foreground" />
//           </button>
//         </div>

//         {/* Form */}
//         <form id="complaint-form" onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* Title */}
//           <div>
//             <label htmlFor="complaint-title" className="block text-sm font-medium text-foreground mb-1.5">
//               Title *
//             </label>
//             <input
//               type="text"
//               id="complaint-title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Brief title for your complaint"
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="complaint-description" className="block text-sm font-medium text-foreground mb-1.5">
//               Description *
//             </label>
//             <textarea
//               id="complaint-description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Provide detailed description of the issue (include keywords like fire, gas leak, accident, flood, electric hazard for priority assessment)"
//               rows={4}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
//               required
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label htmlFor="complaint-category" className="block text-sm font-medium text-foreground mb-1.5">
//               Category *
//             </label>
//             <select
//               id="complaint-category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//               required
//             >
//               <option value="">Select category</option>
//               <option value="water">Water Supply</option>
//               <option value="electricity">Electricity</option>
//               <option value="roads">Roads</option>
//               <option value="sanitation">Sanitation</option>
//               <option value="other">Public Safety / Other</option>
//             </select>
//           </div>

//           {/* People Affected */}
//           <div>
//             <label htmlFor="complaint-people-affected" className="block text-sm font-medium text-foreground mb-1.5">
//               People Affected *
//             </label>
//             <select
//               id="complaint-people-affected"
//               name="peopleAffected"
//               value={formData.peopleAffected}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//               required
//             >
//               <option value="">Select number of people affected</option>
//               <option value="1-10">1-10 people</option>
//               <option value="10-50">10-50 people</option>
//               <option value="50-100">50-100 people</option>
//               <option value="100+">100+ people</option>
//             </select>
//           </div>

//           {/* Zone */}
//           <div>
//             <label htmlFor="complaint-zone" className="block text-sm font-medium text-foreground mb-1.5">
//               Zone *
//             </label>
//             <select
//               id="complaint-zone"
//               name="zone"
//               value={formData.zone}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//               required
//             >
//               <option value="">Select zone</option>
//               {zones.map((zone) => (
//                 <option key={zone} value={zone}>{zone}</option>
//               ))}
//             </select>
//           </div>

//           {/* Location - Google Maps URL */}
//           <div>
//             <label htmlFor="complaint-location" className="block text-sm font-medium text-foreground mb-1.5">
//               Location (Google Maps URL) *
//             </label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//               <input
//                 type="url"
//                 id="complaint-location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="https://www.google.com/maps/..."
//                 className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//                 required
//               />
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">
//               Open Google Maps, find your location, and paste the share link here
//             </p>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label htmlFor="complaint-image" className="block text-sm font-medium text-foreground mb-1.5">
//               Upload Image (Optional)
//             </label>
//             <div className="relative">
//               <input
//                 type="file"
//                 id="complaint-image"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="complaint-image"
//                 className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-dashed border-input bg-background text-muted-foreground hover:bg-secondary cursor-pointer transition-colors"
//               >
//                 <Upload className="w-5 h-5" />
//                 <span>{imageFile ? imageFile.name : 'Click to upload image'}</span>
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-hover"
//           >
//             {isSubmitting ? (
//               'Submitting...'
//             ) : (
//               <>
//                 <Send className="w-4 h-4" />
//                 Submit Complaint
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ComplaintForm;
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintContext';
import { zones } from '@/data/dummyData';
import { X, Upload, Send, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ComplaintFormProps {
  onClose: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { addComplaint } = useComplaints();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as 'water' | 'electricity' | 'roads' | 'sanitation' | 'other' | '',
    peopleAffected: '' as '1-10' | '10-50' | '50-100' | '100+' | '',
    location: '',
    zone: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const isValidGoogleMapsUrl = (url: string) =>
    url.includes('google.com/maps') || url.includes('maps.google.com') || url.includes('goo.gl/maps');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title || !formData.description || !formData.category ||
        !formData.peopleAffected || !formData.location || !formData.zone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isValidGoogleMapsUrl(formData.location)) {
      toast.error('Please enter a valid Google Maps URL');
      return;
    }

    setIsSubmitting(true);
    try {
      await addComplaint({
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous',
        title: formData.title,
        description: formData.description,
        category: formData.category as 'water' | 'electricity' | 'roads' | 'sanitation' | 'other',
        peopleAffected: formData.peopleAffected as '1-10' | '10-50' | '50-100' | '100+',
        location: formData.location,
        zone: formData.zone,
        status: 'pending',
        imageFile: imageFile || undefined,
      });
      toast.success('Complaint submitted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Submit a Complaint</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              placeholder="Brief title" className="w-full px-4 py-2.5 rounded-lg border bg-background" required />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              placeholder="Describe the issue" rows={4} className="w-full px-4 py-2.5 rounded-lg border bg-background" required />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-background" required>
              <option value="">Select category</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity</option>
              <option value="roads">Roads</option>
              <option value="sanitation">Sanitation</option>
              <option value="other">Public Safety / Other</option>
            </select>
          </div>

          {/* People Affected */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">People Affected *</label>
            <select name="peopleAffected" value={formData.peopleAffected} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-background" required>
              <option value="">Select number of people</option>
              <option value="1-10">1-10 people</option>
              <option value="10-50">10-50 people</option>
              <option value="50-100">50-100 people</option>
              <option value="100+">100+ people</option>
            </select>
          </div>

          {/* Zone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Zone *</label>
            <select name="zone" value={formData.zone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-background" required>
              <option value="">Select zone</option>
              {zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Location (Google Maps URL) *</label>
            <input type="url" name="location" value={formData.location} onChange={handleChange} placeholder="https://www.google.com/maps/..." className="w-full px-4 py-2.5 rounded-lg border bg-background" required />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Upload Image (Optional)</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {imageFile && <p>{imageFile.name}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-primary text-white rounded-lg">
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;

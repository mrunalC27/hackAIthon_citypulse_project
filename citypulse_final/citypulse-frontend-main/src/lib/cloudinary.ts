// export const uploadToCloudinary = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "add preset name");

//   const res = await fetch(
//     "https://api.cloudinary.com/v1_1/Add Cloud name /image/upload",
//     {
//       method: "POST",
//       body: formData
//     }
//   );

//   const data = await res.json();
//   return data.secure_url;
// };



export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "citypulse_preset"); // 👈 your preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ddxo6iabl/image/upload", // 👈 your cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
};

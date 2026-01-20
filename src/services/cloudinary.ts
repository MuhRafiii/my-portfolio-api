import cloudinary from "../utils/cloudinary";

export const uploadImage = async (
  file: Express.Multer.File,
  folder: string
) => {
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    { folder }
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export const deleteImage = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

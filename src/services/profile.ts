import { prisma } from "../clients/prisma";
import { AppError } from "../errors/appError";
import { Profile } from "../types/profile";
import { deleteImage, uploadImage } from "./cloudinary";

export const getProfile = async () => {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  return profile;
};

export const updateProfile = async (
  data: Profile,
  file?: Express.Multer.File
) => {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  let photo = profile.photo;
  let photoPublicId = profile.photoPublicId;

  if (file) {
    if (photoPublicId) {
      deleteImage(photoPublicId);
    }
    const { url, publicId } = await uploadImage(file, "portfolio/profile");

    photo = url;
    photoPublicId = publicId;
  }

  const updatedProfile = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      ...data,
      photo,
      photoPublicId,
    },
  });

  return updatedProfile;
};

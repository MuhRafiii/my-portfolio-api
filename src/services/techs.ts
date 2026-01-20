import { prisma } from "../clients/prisma";
import { AppError } from "../errors/appError";
import { deleteImage, uploadImage } from "./cloudinary";

export const getTechs = async () => {
  const techs = await prisma.techs.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  return techs;
};

export const createTech = async (name: string, file: Express.Multer.File) => {
  const { url, publicId } = await uploadImage(file, "portfolio/techs");
  const icon = url;
  const iconPublicId = publicId;

  const tech = await prisma.techs.create({
    data: {
      name,
      icon,
      iconPublicId,
    },
  });

  return tech;
};

export const updateTech = async (
  id: number,
  name: string,
  file?: Express.Multer.File
) => {
  const tech = await prisma.techs.findUnique({ where: { id } });

  if (!tech) {
    throw new AppError("Tech not found", 404);
  }

  let icon = tech.icon;
  let iconPublicId = tech.iconPublicId;

  if (file) {
    if (iconPublicId) {
      deleteImage(iconPublicId);
    }

    const { url, publicId } = await uploadImage(file, "portfolio/techs");

    icon = url;
    iconPublicId = publicId;
  }

  const updatedTech = await prisma.techs.update({
    where: { id },
    data: {
      name,
      icon,
      iconPublicId,
    },
  });

  return updatedTech;
};

export const deleteTech = async (id: number) => {
  const tech = await prisma.techs.findUnique({ where: { id } });

  if (!tech) {
    throw new AppError("Tech not found", 404);
  }

  if (tech.iconPublicId) {
    deleteImage(tech.iconPublicId);
  }

  const deletedTech = await prisma.techs.delete({ where: { id } });

  return deletedTech;
};

import { Month } from "@prisma/client";
import { prisma } from "../clients/prisma";
import { AppError } from "../errors/appError";
import { deleteImage, uploadImage } from "./cloudinary";

export const getExperiences = async () => {
  const experiences = await prisma.experiences.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  if (!experiences) {
    throw new AppError("No experiences found", 404);
  }

  return experiences;
};

export const createExperience = async (
  position: string,
  company: string,
  jobdesk: string[],
  tech: string[],
  start_month: Month,
  start_year: number,
  end_month: Month | null,
  end_year: number | null,
  file: Express.Multer.File
) => {
  const { url, publicId } = await uploadImage(file, "portfolio/experiences");
  const experience = await prisma.experiences.create({
    data: {
      position,
      company,
      jobdesk,
      tech,
      start_month,
      start_year,
      end_month,
      end_year,
      logo: url,
      logoPublicId: publicId,
    },
  });

  return experience;
};

export const updateExperience = async (
  id: number,
  position?: string,
  company?: string,
  jobdesk?: string[],
  tech?: string[],
  start_month?: Month,
  start_year?: number,
  end_month?: Month,
  end_year?: number,
  file?: Express.Multer.File
) => {
  const experience = await prisma.experiences.findUnique({ where: { id } });
  if (!experience) {
    throw new AppError("Experience not found", 404);
  }

  let logo = experience.logo;
  let logoPublicId = experience.logoPublicId;

  if (file) {
    if (logoPublicId) {
      deleteImage(experience.logoPublicId);
    }

    const { url, publicId } = await uploadImage(file, "portfolio/experiences");
    logo = url;
    logoPublicId = publicId;
  }

  const updatedExperience = await prisma.experiences.update({
    where: { id },
    data: {
      position,
      company,
      jobdesk,
      tech,
      start_month,
      start_year,
      end_month,
      end_year,
      logo,
      logoPublicId,
    },
  });

  return updatedExperience;
};

export const deleteExperience = async (id: number) => {
  const experience = await prisma.experiences.findUnique({ where: { id } });
  if (!experience) {
    throw new AppError("Experience not found", 404);
  }

  if (experience.logoPublicId) {
    deleteImage(experience.logoPublicId);
  }

  const deletedExperience = await prisma.experiences.delete({ where: { id } });

  return deletedExperience;
};

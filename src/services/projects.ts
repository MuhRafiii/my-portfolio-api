import { prisma } from "../clients/prisma";
import { AppError } from "../errors/appError";
import { deleteImage, uploadImage } from "./cloudinary";

export const getProjects = async () => {
  const projcets = await prisma.projects.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return projcets;
};

export const createProject = async (
  name: string,
  description: string,
  tech: string[],
  github: string | null,
  demo: string | null,
  file: Express.Multer.File,
) => {
  const { url, publicId } = await uploadImage(file, "portfolio/projects");

  const project = await prisma.projects.create({
    data: {
      name,
      description,
      tech,
      github,
      demo,
      image: url,
      imagePublicId: publicId,
    },
  });

  return project;
};

export const updateProject = async (
  id: number,
  name?: string,
  description?: string,
  tech?: string[],
  github?: string,
  demo?: string,
  file?: Express.Multer.File,
) => {
  const project = await prisma.projects.findUnique({ where: { id } });
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  let image = project.image;
  let imagePublicId = project.imagePublicId;

  if (file) {
    if (imagePublicId) {
      deleteImage(imagePublicId);
    }

    const { url, publicId } = await uploadImage(file, "portfolio/projects");
    image = url;
    imagePublicId = publicId;
  }

  const updatedProject = await prisma.projects.update({
    where: { id },
    data: {
      name,
      description,
      tech,
      github: github ? github : null,
      demo: demo ? demo : null,
      image,
      imagePublicId,
    },
  });

  return updatedProject;
};

export const deleteProject = async (id: number) => {
  const project = await prisma.projects.findUnique({ where: { id } });
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (project.imagePublicId) {
    deleteImage(project.imagePublicId);
  }

  const deletedProject = await prisma.projects.delete({ where: { id } });

  return deletedProject;
};

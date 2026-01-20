import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  const hashedPassword = await bcrypt.hash(password!, 10);

  const data = await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      username: username!,
      password: hashedPassword,
    },
  });

  // const name = "Muhammad Rafi";
  // const title = "Full Stack Developer";
  // const about =
  //   "A full stack developer with experience in building websites using various technologies, including Node.js, React, Next.js, Tailwind CSS, Bootstrap, Express.js, Supabase, and more. Reliable in teamwork, group discussions, and effective communication with colleagues. Committed to continuously learning new skills, adapting to new environments, and working professionally.";
  // const email = "mrafi0603@gmail.com";
  // const phone = "6289521427585";
  // const address = "Indonesia, West Java, Bekasi";
  // const photo =
  //   "https://res.cloudinary.com/dxlevzn3n/image/upload/v1757494898/circle-app-images/kqos2jiklkgjdzw8kpz9.jpg";
  // const photoPublicId = "circle-app-images/kqos2jiklkgjdzw8kpz9";
  // const linkedin = "https://www.linkedin.com/in/muhammad-r4fi/";
  // const instagram = "https://www.instagram.com/mhmmd_rafi/";
  // const github = "https://github.com/MuhRafiii";
  // const resume =
  //   "https://drive.google.com/file/d/1hbZK78K82Xw4eKC3arPgNZ1FvYVMrzl0/view?usp=drive_link";

  // const data = await prisma.profile.upsert({
  //   where: { email },
  //   update: {},
  //   create: {
  //     name,
  //     title,
  //     about,
  //     email,
  //     phone,
  //     address,
  //     photo,
  //     photoPublicId,
  //     linkedin,
  //     instagram,
  //     github,
  //     resume,
  //   },
  // });

  console.log("Data seeded:", {
    data,
  });
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

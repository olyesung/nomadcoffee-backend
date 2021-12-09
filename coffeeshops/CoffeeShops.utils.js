import { createWriteStream } from "fs";

export const processCategories = (caption) => {
  const categories = caption.match(/@[\w]+/g) || [];
  return categories.map((name) => ({
    where: { name },
    create: { name },
  }));
};

export const processFile = async (file, id) => {
  const { filename, createReadStream } = await file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
};

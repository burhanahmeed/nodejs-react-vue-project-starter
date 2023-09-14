import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, "")); // Define the filename for uploaded files
  },
});

export const uploaderDiskMiddleware = multer({ storage });

export const uploaderMemoryMiddleware = multer({ storage: multer.memoryStorage() });

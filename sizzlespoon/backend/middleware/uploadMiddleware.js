const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

// ── Configure Cloudinary ───────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Use memory storage — buffer is piped directly to Cloudinary ────────────────
// This avoids the multer-storage-cloudinary peer-dep issue entirely.
const storage = multer.memoryStorage();

// ── File Filter ────────────────────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and WEBP are allowed.'), false);
  }
};

// ── Multer instance ────────────────────────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

// ── Helper: stream buffer to Cloudinary ────────────────────────────────────────
// Called inside controllers AFTER multer has populated req.file.buffer.
const uploadToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder:          'sizzlespoon/recipes',
        resource_type:   'image',
        transformation:  [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    // Convert buffer to readable stream and pipe into Cloudinary
    Readable.from(buffer).pipe(uploadStream);
  });
};

module.exports = { upload, uploadToCloudinary };

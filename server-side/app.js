import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import crypto from "crypto";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import addNewGenomeDataRoutes from "./routes/add-new-genome-data-routes.js";
import dashboardRoutes from "./routes/dashboard-routes.js";
import {
  uploadDataFile,
  uploadFastaFile,
} from "./controllers/add-new-genome-data-controllers.js";

/**
 * On the launch of this file as starting entry point on server side
 * These are the basic and important configuration for the app
 */
//dotenv config
dotenv.config();

//file path constants
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
// console.log(__filename);
// console.log(__dirname);
//express app using other dependencies and libraries
const app = express();
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabling CSP for local development
  })
); // Adds extra security layers for HTTP headers //just adds an extra layer for request
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
/**
 * CORS configuration to allow requests from all origins.
 * This ensures that API requests and resources work seamlessly across the private network.
 */
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Supported HTTP methods
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept", // Supported headers
  })
);

app.use(
  "/data/sample/download",
  express.static(path.join(__dirname, "data/sample/download"))
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "dist")));

//we do not need to make any folder to serve them as static folder
//only the sample file can be served as static folder to let users download
//the data sample

/**
 * storing the files
 */
//function to generate the unique folder names
const generateUniqueFolderName = () => {
  return crypto.randomBytes(8).toString("hex"); // Generates a random hash
};

//handling the upload feature for the project on here itself
//upload the files to server
//storage setting
const dataFileStorage = multer.diskStorage({
  //specifying the destination
  destination: function (req, file, cb) {
    // Generate a random folder name once per request
    const folderName = generateUniqueFolderName();
    // Create the upload path for 'data/uploads'
    const uploadPath = path.join(__dirname, "/data/uploads", folderName);
    // Create the folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    // Save the folder name and path in the request object to access it later
    req.uploadFolder = folderName;
    // Call the callback function to pass the directory
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    //creating a suffix to add to the file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
//now how storage setting will be used in the upload process
const fileUpload = multer({
  storage: dataFileStorage, //storage setting set for storage
  /** limits: {}, */ //limits can't be set here
  fileFilter: function (req, file, cb) {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // console.log({ mimetype, extname }); // Debug log

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Uploaded file is not a .CSV file."));
    }
  },
});
//action and response when upload url hit by frontend
app.post(
  "/add-new-genome-data/upload-file",
  fileUpload.single("file"),
  uploadDataFile
);

// Multer storage configuration
const fastaFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "/data/export/genome");

    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath); // Pass the directory to multer
  },
  filename: function (req, file, cb) {
    // Save the file with its original name or a generated name
    const originalFilename = file.originalname || `file-${Date.now()}.txt`;
    cb(null, originalFilename);
  },
});

// Multer middleware for file upload
const fileFastaUpload = multer({
  storage: fastaFileStorage,
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["text/plain"];
    const allowedExtensions = [".txt"];

    const mimetypeValid = allowedMimeTypes.includes(file.mimetype);
    const extnameValid = allowedExtensions.includes(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetypeValid && extnameValid) {
      cb(null, true); // Accept the file
    } else {
      console.error("File rejected: Invalid file type");
      cb(new Error("Uploaded file is not a TXT file."));
    }
  },
});

// Upload endpoint
app.post(
  "/add-new-genome-data/upload-fasta-file",
  fileFastaUpload.single("file"), // Process the file
  uploadFastaFile // Call the actual function
);

/**
 * Root Routes here and specific routes are written in separate file
 */
app.use("/add-new-genome-data", addNewGenomeDataRoutes);
//route has not been decided yet so just in test phase to implement the features
app.use("/data", dashboardRoutes);
//now all the remaining routes can return the frontend part so always use it at last
// Handle React routing, return all requests to the React app

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/**
 * connection with database initiated on server start instead of
 * connecting to the database on every call
 */
//PORT configuration
const PORT = process.env.PORT || 5174;
export const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
export const database = client.db("genomeDatabase");

/**
 * Force HTTP by explicitly binding the app to the HTTP server.
 * This ensures the app serves only on HTTP without redirecting to HTTPS.
 */
import http from "http";
const server = http.createServer(app); // Create HTTP server instance

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`); // Log the server URL
});

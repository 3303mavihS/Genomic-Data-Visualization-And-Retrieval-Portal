import express from "express";
import {
  getListOfCollectionsInDatabase,
  readFileContent,
} from "../controllers/add-new-genome-data-controllers.js";
import { saveFileContent } from "../controllers/add-new-genome-data-controllers.js";

const router = express.Router();

/**
 * Post or write Routes
 */
router.post("/save-file-content", saveFileContent);

/**
 * Get or read Routes
 */
router.get("/read-file-content/:folder_name", readFileContent);
router.get("/get-genome-list", getListOfCollectionsInDatabase);

export default router;

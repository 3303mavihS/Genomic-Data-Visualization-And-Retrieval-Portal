import express from "express";
import {
  returnGeneByLength,
  returnGeneBySeq,
  returnGeneData,
  returnGeneDataByNextPrevBtn,
  returnSearchByGenePositionRange,
  returnLastPointOfData,
  returnSlideData,
  returnSearchInGeneData,
  exportGeneSequence,
} from "../controllers/dashboard-controllers.js";

const router = express.Router();

/**
 * Only Get or Read Router as the dashboard would not post anything
 * all the parameter or data will be receieved in request and will be consumed
 * there only and nothing would be able to get inside the database from the dashboard side
 */

router.get("/calculate-slides", returnLastPointOfData);
router.get(`/slide/:slideNo/params`, returnSlideData);
router.get("/get-range-data", returnSearchByGenePositionRange);
router.get("/get-gene-data-by-length", returnGeneByLength);
router.get("/get-gene-data", returnGeneData);
router.get("/export-gene-sequence",exportGeneSequence);
router.get("/get-gene-data/by-slno", returnGeneDataByNextPrevBtn);
router.get("/get-keyword-result",returnSearchInGeneData);
router.post("/get-gene-data-by-seq", returnGeneBySeq);

export default router;

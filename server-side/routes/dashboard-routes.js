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
  returnLengthOfSequence,
} from "../controllers/dashboard-controllers.js";

const router = express.Router();

/**
 * Only Get or Read Router as the dashboard would not post anything
 * all the parameter or data will be receieved in request and will be consumed
 * there only and nothing would be able to get inside the database from the dashboard side
 */
router.get("/calculate-slides/params", returnLastPointOfData);
router.get(`/slide/:slideNo/params`, returnSlideData);
router.get("/get-range-data/params", returnSearchByGenePositionRange);
router.get("/get-gene-data-by-length/params", returnGeneByLength);
router.get("/get-gene-data/params", returnGeneData);
router.get("/export-gene-sequence/params", exportGeneSequence);
router.get("/get-gene-data/by-slno/params", returnGeneDataByNextPrevBtn);
router.get("/get-keyword-result/params", returnSearchInGeneData);
router.post("/get-gene-data-by-seq/params", returnGeneBySeq);
router.get("/get-total-length/params", returnLengthOfSequence);

export default router;

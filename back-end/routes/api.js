import express from "express";
export const router = express.Router();

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

import {
  uploadScreenshot,
  getScreenshots,
  deleteScreenshot,
} from "../config/firebase.js";

router.get("/screenshots", async (req, res) => {
  try {
    res.json({
      success: true,
      screenshots: await getScreenshots(req.query.session),
    });
  } catch (error) {
    res.json({
      success: false,
      err: "Failed to get screenshots: " + error,
    });
  }
});
router.delete("/screenshot", async (req, res) => {
  try {
    await deleteScreenshot(req.query.id);
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      err: "Failed to delete screenshot: " + error,
    });
  }
});
router.post("/screenshot", upload.single("screen"), async (req, res) => {
  try {
    res.json({
      success: true,
      screenshotUrl: await uploadScreenshot(req.query.session, req.file.buffer),
    });
  } catch (error) {
    res.json({
      success: false,
      err: "Failed to upload screenshot: " + error,
    });
  }
});

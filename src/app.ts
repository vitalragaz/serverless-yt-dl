import dotenv from "dotenv";
import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import ytdl from "ytdl-core";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Validation schema
const schema = Joi.object({
  url: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!ytdl.validateURL(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  quality: Joi.string()
    .valid("lowest", "highest", "highestaudio", "lowestaudio", "highestvideo", "lowestvideo")
    .default("highest"),
});

// Routes
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // Validate request
    const { error, value } = schema.validate(req.query);
    if (error) throw new Error(error.details[0].message);

    // Get video info
    const { url, quality } = value;

    const info = await ytdl.getInfo(url);
    const { title } = info.videoDetails;

    // Get format
    const format = quality.includes("audio") ? "mp3" : "mp4";

    // Return video as download
    res.header("Content-Disposition", `attachment; filename="${title}.${format}"`);

    ytdl(url, {
      quality: quality as string,
      ...(quality.includes("lowest", "highest") ? { filter: "videoandaudio" } : {}),
    }).pipe(res);
  })
);

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).json({
    message: err.message,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

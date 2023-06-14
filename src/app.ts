import express, { Request, Response } from "express";
import ytdl from "ytdl-core";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  const { url, quality = "highest" } = req.query;

  if (!url) {
    return res.status(400).json({
      message: "URL is required",
    });
  }

  if (!ytdl.validateURL(url as string)) {
    return res.status(400).json({
      message: "URL is invalid",
    });
  }

  ytdl(url as string, {
    quality: quality as string,
  }).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

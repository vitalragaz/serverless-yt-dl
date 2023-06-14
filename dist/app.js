"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    const { url, quality = "highest" } = req.query;
    (0, ytdl_core_1.default)(url, {
        quality: quality,
    }).pipe(res);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

import path from "path";
import express from "express";

const __dirname = path.resolve();

export const setupStaticFiles = (app) => {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });
};

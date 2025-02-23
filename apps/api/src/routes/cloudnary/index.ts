import { Router } from "express";
import {v2 as cloudinary} from "cloudinary";
import client from "@repo/db/src/db";
export const cloudinaryRouter = Router();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinaryRouter.post("/upload", async (req, res) => {
    try {
        const { file,id } = req.query;
        const result = await cloudinary.uploader.upload(file as string);
        const workspace = await client.workspace.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (workspace) {
            await client.workspace.update({
                where: {
                    id: Number(id)
                },
                data: {
                    image_link: result.url
                }
            });
        }
    
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});

cloudinaryRouter.get("/workspaces", async (req, res) => {
    try {
        const { id } = req.query;
        const user = await client.user.findUnique({
            where: {
                id: id as string
            },
            include: {
                workspaces: true   
            }
        })
        if (user){
            const workspaces = user.workspaces ;
           res.json(workspaces);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});

cloudinaryRouter.get("/workspace/create", async (req, res) => {
    try {
        const { id,name } = req.query;
        const user = await client.user.findUnique({
            where: {
                id: id as string
            },
            include: {
                workspaces: true   
            }
        });
        if (user){
            const workspace = await client.workspace.create({
                data: {
                    name: name as string,
                    image_link: '',
                    User: {
                        connect: { id: user.id }
                    }
                }
            });
            res.json(workspace);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});

cloudinaryRouter.get("/workspace/delete", async (req, res) => {
    try {
        const { id } = req.query;
        const workspace = await client.workspace.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(workspace);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});
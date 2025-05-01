import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all skills
  app.get("/api/skills", async (_req: Request, res: Response) => {
    try {
      const skills = await storage.getAllSkills();
      return res.status(200).json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      return res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get all services
  app.get("/api/services", async (_req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.saveMessage(validatedData);
      return res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

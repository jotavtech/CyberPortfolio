var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// db/index.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertMessageSchema: () => insertMessageSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertSkillSchema: () => insertSkillSchema,
  insertUserSchema: () => insertUserSchema,
  messages: () => messages,
  projects: () => projects,
  services: () => services,
  skills: () => skills,
  users: () => users
});
import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  iconColor: text("icon_color").notNull(),
  titleColor: text("title_color").notNull(),
  borderColor: text("border_color").notNull(),
  items: jsonb("items").notNull().$type()
});
var insertSkillSchema = createInsertSchema(skills);
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").notNull(),
  imageUrl: text("image_url").notNull(),
  projectUrl: text("project_url").notNull(),
  caseStudyUrl: text("case_study_url").notNull(),
  category: text("category").notNull(),
  titleColor: text("title_color").notNull(),
  borderColor: text("border_color").notNull(),
  primaryBtnColor: text("primary_btn_color").notNull(),
  secondaryBtnColor: text("secondary_btn_color").notNull()
});
var insertProjectSchema = createInsertSchema(projects);
var services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  titleColor: text("title_color").notNull(),
  borderColor: text("border_color").notNull(),
  accentColor: text("accent_color").notNull(),
  checkColor: text("check_color").notNull(),
  hoverColor: text("hover_color").notNull(),
  features: jsonb("features").notNull().$type()
});
var insertServiceSchema = createInsertSchema(services);
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString())
});
var insertMessageSchema = createInsertSchema(messages, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Please enter a valid email address"),
  subject: (schema) => schema.min(3, "Subject must be at least 3 characters"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters")
}).omit({ id: true, createdAt: true });

// db/index.ts
import dotenv from "dotenv";
dotenv.config();
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
var storage = {
  async getAllSkills() {
    return await db.query.skills.findMany();
  },
  async getAllProjects() {
    return await db.query.projects.findMany();
  },
  async getAllServices() {
    return await db.query.services.findMany();
  },
  async saveMessage(message) {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
};

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/skills", async (_req, res) => {
    try {
      const skills3 = await storage.getAllSkills();
      return res.status(200).json(skills3);
    } catch (error) {
      console.error("Error fetching skills:", error);
      return res.status(500).json({ error: "Failed to fetch skills" });
    }
  });
  app2.get("/api/projects", async (_req, res) => {
    try {
      const projects3 = await storage.getAllProjects();
      return res.status(200).json(projects3);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  app2.get("/api/services", async (_req, res) => {
    try {
      const services3 = await storage.getAllServices();
      return res.status(200).json(services3);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ error: "Failed to fetch services" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/cyberportfolio/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@db": path.resolve(import.meta.dirname, "db"),
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

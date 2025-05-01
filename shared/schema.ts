import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  iconColor: text("icon_color").notNull(),
  titleColor: text("title_color").notNull(),
  borderColor: text("border_color").notNull(),
  items: jsonb("items").notNull().$type<Array<{ text: string; bulletColor: string }>>(),
});

export const insertSkillSchema = createInsertSchema(skills);
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Projects table
export const projects = pgTable("projects", {
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
  secondaryBtnColor: text("secondary_btn_color").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects);
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  titleColor: text("title_color").notNull(),
  borderColor: text("border_color").notNull(),
  accentColor: text("accent_color").notNull(),
  checkColor: text("check_color").notNull(),
  hoverColor: text("hover_color").notNull(),
  features: jsonb("features").notNull().$type<string[]>(),
});

export const insertServiceSchema = createInsertSchema(services);
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Contact messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertMessageSchema = createInsertSchema(messages, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Please enter a valid email address"),
  subject: (schema) => schema.min(3, "Subject must be at least 3 characters"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters")
}).omit({ id: true, createdAt: true });

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

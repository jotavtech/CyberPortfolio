import { db } from '@db';
import { skills, projects, services, messages as messagesTable, InsertMessage } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const storage = {
  async getAllSkills() {
    return await db.query.skills.findMany();
  },

  async getAllProjects() {
    return await db.query.projects.findMany();
  },

  async getAllServices() {
    return await db.query.services.findMany();
  },

  async saveMessage(message: InsertMessage) {
    const [newMessage] = await db.insert(messagesTable).values(message).returning();
    return newMessage;
  },
};

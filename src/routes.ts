import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import {z} from "zod";

export async function appRoutes(app: FastifyInstance){
     
  app.get ("/habits", async (request) => {
  
    const createHabitBody = z.object({
      title: z.string(),
      weekday: z.array(
        z.number().min(0).max(6))
   })

     const { title, weekday} = createHabitBody.parse(request.body)

    await prisma.habit.create ({
      data: {
        title,
        createdAt: new Date(),
        weekDays: {
          create: weekday.map((weekday) => {
             return {
              weekday: weekday
             }
            
            })
        }
      }
    })

})}


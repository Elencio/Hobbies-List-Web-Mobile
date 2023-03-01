import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import {z} from "zod";
import dayjs from "dayjs";

export async function appRoutes(app: FastifyInstance){
     
  app.get ("/habits", async (request) => {
  
    const createHabitBody = z.object({
      title: z.string(),
      weekday: z.array(
        z.number().min(0).max(6))
   })

     const { title, weekday} = createHabitBody.parse(request.body)

     const today = dayjs().startOf("day").toDate();

    await prisma.habit.create ({
      data: {
        title,
        createdAt: today,
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


import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../connection.ts'
import { schema } from '../../schema/index.ts'
import z4, { z } from 'zod/v4'
import { desc, eq } from 'drizzle-orm'

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms/:roomId/questions', {
    schema: {
        params: z.object({
            roomId: z.string(),
        }),
    },
  }, async (request) => {
    const { roomId } = request.params

    console.log(roomId);
    

    const result = await db
    .select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
    })
    .from(schema.questions)
    .where(eq(schema.questions.roomId, roomId))
    .orderBy(desc(schema.questions.createdAt))

    return result
  })
}

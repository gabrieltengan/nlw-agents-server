import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createRoomRoute } from './db/http/routes/create-room.ts'
import { getRoomsRoute } from './db/http/routes/get-rooms.ts'
import { env } from './env.ts'
import { getRoomQuestions } from './db/http/routes/get-room-questions.ts'
import { createQuestionRoute } from './db/http/routes/create-question.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'Mi Te Amo Muitão!!!!!!!!!'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)

app.listen({ port: env.PORT })

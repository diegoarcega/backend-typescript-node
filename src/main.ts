import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import './modules/database/sqlite'
import * as cors from 'cors'

// https://github.com/cdiaz/nestjs-demo/tree/master/src/modules/auth
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  await app.listen(3333)
}

bootstrap()

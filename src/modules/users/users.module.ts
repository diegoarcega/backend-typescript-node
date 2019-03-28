import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AuthMiddleware } from '../../middlewares/auth.middleware'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  components: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController)
  }
}
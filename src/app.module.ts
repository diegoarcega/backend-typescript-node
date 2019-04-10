import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersController } from './modules/users/users.controller';
import * as toJson from '@meanie/mongoose-to-json'
import * as mongoose from 'mongoose'
mongoose.plugin(toJson)

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController)
  }
}

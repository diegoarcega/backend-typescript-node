import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersSchema } from './users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
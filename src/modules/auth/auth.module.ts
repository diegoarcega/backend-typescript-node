import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { LoginService } from './login.service'
import { SignupService } from './signup.service'
import { AuthHelper } from './auth.helper'
import { UsersSchema } from '../users/users.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }])],
  controllers: [AuthController],
  providers: [LoginService, SignupService, AuthHelper],
})
export class AuthModule{}
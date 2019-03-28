import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { LoginService } from './login.service'
import { SignupService } from './signup.service'
import { AuthHelper } from './auth.helper'

@Module({
  controllers: [AuthController],
  providers: [LoginService, SignupService, AuthHelper],
})
export class AuthModule{}
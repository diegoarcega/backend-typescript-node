import { Controller, Get, Post, Request, Response, Body, HttpStatus } from '@nestjs/common'
import { LoginService } from './login.service'
import { SignupService } from './signup.service'

@Controller()
export class AuthController {
  constructor(private loginService: LoginService, private signupService: SignupService) {}

  @Post('/login')
  public async login(@Response() res, @Body('email') email, @Body('password') password) {
    const auth = await this.loginService.login(email, password)
    res.status(HttpStatus.OK).json(auth)
  }
}

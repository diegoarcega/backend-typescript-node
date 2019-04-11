import { Controller, Get, Post, Request, Response, Body, HttpStatus } from '@nestjs/common'
import { LoginService } from './login.service'

@Controller()
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  async login(@Response() res, @Body('email') email, @Body('password') password) {
    try {
      const response = await this.loginService.login(email, password)
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(error)
    }
  }
}

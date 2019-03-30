import { Controller, Response, Get, Post, Put, Delete, Request, Body, Param, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'

function getSomething () {
  return new Promise((resolve, reject) => setTimeout(() => resolve('im response from promise'), 1000))
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getAllUsers (@Response() res) {
    const users = await this.usersService.getAll()
    res.status(HttpStatus.OK).json(users)
  }

  @Get('/:id')
  public async getUser(@Response() res, @Param('id') id) {
    const user = await this.usersService.getUser(id)
    res.status(HttpStatus.OK).json(user)
  }

  @Post()
  public async create(@Response() res, @Body('email') email, @Body('password') password) {
    const result = await this.usersService.create(email, password)
    res.status(HttpStatus.ACCEPTED).json(result)
  }
}
import { Controller, Response, Get, Post, Put, Delete, Request, Body, Param, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserInterface } from './users.interface';

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
  public async create(@Response() res, @Body('user') user) {
    const result = await this.usersService.create(user)
    res.status(HttpStatus.ACCEPTED).json(result)
  }

  @Put()
  public async update(@Response() res, @Body('user') user) {
    const result = await this.usersService.update(user)
    res.status(HttpStatus.ACCEPTED).json(result)
  }

  @Delete(':id')
  public async delete(@Response() res, @Param('id') id) {
    const result = await this.usersService.delete(id)
    res.status(HttpStatus.ACCEPTED).json(result)
  }
}
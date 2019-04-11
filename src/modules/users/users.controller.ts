import { Controller, Response, Get, Post, Put, Delete, Request, Body, Param, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers (@Response() res) {
    try {
      const users = await this.usersService.getAll()
      res.status(HttpStatus.OK).json(users)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get('/:id')
  async getUser(@Response() res, @Param('id') id) {
    try {
      const user = await this.usersService.getUser(id)
      res.status(HttpStatus.OK).json(user)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post()
  async create(@Response() res, @Body('user') user) {
    try {
      const result = await this.usersService.create(user)
      res.status(HttpStatus.ACCEPTED).json(result)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Put()
  async update(@Response() res, @Body('user') user) {
    try {
      const result = await this.usersService.update(user)
      res.status(HttpStatus.ACCEPTED).json(result)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Delete(':id')
  async delete(@Response() res, @Param('id') id) {
    try {
      const result = await this.usersService.delete(id)
      res.status(HttpStatus.ACCEPTED).json(result)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
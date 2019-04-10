import { Injectable, HttpException } from '@nestjs/common'
import { AuthHelper } from './auth.helper'
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../users/users.interface';
import { Model } from 'mongoose'

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('users') private readonly usersModel: Model<UserInterface>,
    private authHelper: AuthHelper,
  ) { }

  public async login(email, password) {
    if (!email) {
      throw new HttpException('Email_id is required', 422)
    }

    if (!password) {
      throw new HttpException('Password is required', 422)
    }

    const user = await this.usersModel.findOne({ email })

    if (!user) {
      throw new HttpException('User does not exist', 404)
    }

    if (user.password !== password) {
      throw new HttpException('Incorrect password', 401)
    }

    return this.authHelper.generateToken(user)
  }
}
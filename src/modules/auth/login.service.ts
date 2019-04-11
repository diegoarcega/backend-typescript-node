import { Injectable, HttpException } from '@nestjs/common'
import { AuthHelper } from './auth.helper'
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../users/users.interface';
import { Model } from 'mongoose'
import { TokenInterface } from './auth.helper'

interface LoginInterface {
  login(email: string, password: string): Promise<TokenInterface>
}

@Injectable()
export class LoginService implements LoginInterface {
  constructor(
    @InjectModel('users') private readonly usersModel: Model<UserInterface>,
    private authHelper: AuthHelper,
  ) { }

  async login(email, password) {
    if (!email) {
      throw new HttpException('Email is required', 422)
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
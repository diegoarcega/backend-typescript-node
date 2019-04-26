import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose'
import { UserInterface } from './users.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly usersModel: Model<UserInterface>) {}
  getAll(): Promise<UserInterface[]> {
    return this.usersModel.find().select('-password')
  }

  getUser(id: string): Promise<UserInterface> {
    return this.usersModel.findOne({ id })
  }

  create(user: UserInterface): Promise<UserInterface> {
    delete user.id
    return this.usersModel.create(user)
  }

  async update(user: UserInterface): Promise<UserInterface> {
    const { id, password } = user
    delete user.id
    user.password = await this.hashPassword(password)
    return this.usersModel.findOneAndUpdate({ _id: id }, { $set: user }, { new: true })
  }

  delete(id: string): Promise<UserInterface> {
    return this.usersModel.findOneAndDelete(id)
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  comparePassword(user: UserInterface, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password)
  }
}

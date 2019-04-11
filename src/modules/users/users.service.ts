import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { UserInterface } from './users.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly usersModel: Model<UserInterface>) {}
  getAll(): Promise<UserInterface[]> {
    return this.usersModel.find()
  }

  getUser(id: string): Promise<UserInterface> {
    return this.usersModel.findOne({ id })
  }

  create(user: UserInterface): Promise<UserInterface> {
    delete user.id
    return this.usersModel.create(user)
  }

  update(user: UserInterface): Promise<UserInterface> {
    const id = user.id
    delete user.id
    return this.usersModel.findOneAndUpdate({ _id: id }, { $set: user }, { new: true })
  }

  delete(id: string): Promise<UserInterface> {
    return this.usersModel.findOneAndDelete(id)
  }
}

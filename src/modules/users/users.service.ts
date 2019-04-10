import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { UserInterface } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly usersModel: Model<UserInterface>) {}
  public getAll() {
    return this.usersModel.find()
  }

  public getUser(id: string) {
    return this.usersModel.findOne({ id })
  }

  public create(user: UserInterface) {
    delete user.id
    return this.usersModel.create(user)
  }

  public update(user: UserInterface) {
    const id = user.id
    delete user.id
    return this.usersModel.findOneAndUpdate({ _id: id }, { $set: user }, { new: true })
  }

  public delete(id: string) {
    return this.usersModel.findOneAndDelete(id)
  }
}

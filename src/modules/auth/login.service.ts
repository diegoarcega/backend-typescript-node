import { Injectable, HttpException } from '@nestjs/common'
import { AuthHelper } from './auth.helper'
import { database } from '../database/sqlite'

@Injectable()
export class LoginService {
  constructor(private authHelper: AuthHelper){}

  public login(email, password) {
    if (!email) {
      return (new HttpException('Email is required', 422))
    }

    if (!password) {
      return (new HttpException('Password is required', 422))
    }

    const query = 'SELECT * FROM user WHERE email=?'
    const params = [email]
    const handler = (resolve, reject) => (err, user) => {
      if (err) {
        return reject(new HttpException(err, 503))
      } else {
        if (user.length === 0) {
          return reject(new HttpException('User does not exist', 401))
        } else {
          if (password !== user[0].password) {
            return reject(new HttpException('Incorrect password', 401))
          } else {
            return resolve(this.authHelper.generateToken(user[0]))
          }
        }
      }
    }

    return new Promise((resolve, reject) => {
      database.all(query, params, handler(resolve, reject))
    })
  }
}
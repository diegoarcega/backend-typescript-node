import { Injectable, HttpException } from '@nestjs/common'
import * as uuid from 'uuid'
import { database } from '../database/sqlite'

@Injectable()
export class UsersService {
  public getAll() {
    return new Promise((resolve, reject) => {
      database.all('SELECT * FROM user', (err, rows) => {
        !err ? resolve(rows) : reject(new HttpException(err, 500))
      })
    })
  }

  public getUser(id: string) {
    return new Promise((resolve, reject) => {
      database.get('SELECT * FROM user WHERE id = ?', [id], (err, row) => {
        return !err ? resolve(row) : reject(new HttpException(err, 500))
      })
    })
  }

  public create(email: string, password: string) {
    return new Promise((resolve, reject) => {
      database.run(
        'INSERT INTO user(id, email, password, role) VALUES(?, ?, ?, \'user\')',
        [uuid.v1().replace(/-/g, ''), email, password],
        err => !err ? resolve({ message: 'user has been registered'}) : reject(new HttpException(err, 500))
      )
    })
  }
}

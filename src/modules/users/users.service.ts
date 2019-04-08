import { Injectable, HttpException } from '@nestjs/common'
import * as uuid from 'uuid'
import { database } from '../database/sqlite'
import { UserInterface } from './users.interface';

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

  public create(user: UserInterface) {
    return new Promise((resolve, reject) => {
      const newId = uuid.v1().replace(/-/g, '')
      database.run(
        'INSERT INTO user(id, email, password, role) VALUES(?, ?, ?, ?)',
        [newId, user.email, user.password, user.role],
        err => !err ? resolve({ message: 'user has been registered', data: {...user, id: newId } }) : reject(new HttpException(err, 500))
      )
    })
  }

  public update(user: UserInterface) {
    return new Promise((resolve, reject) => {
      database.run(
        `UPDATE user SET email=?, password=?, role=? WHERE(id = ?);`,
        [user.email, user.password, user.role, user.id],
        error => !error ?
          resolve({ 'message': `User ${user.email} has been updated successfully`, data: user }) :
          reject(new HttpException(error, 500))
      )
    })
  }

  public delete(id: string) {
    return new Promise((resolve, reject) => {
      database.run(
        'DELETE FROM user WHERE id = ?',
        [id],
        error => !error ?
          resolve({ 'message': 'User deleted successfully' }) :
          reject(new HttpException(error, 500))
      )
    })
  }
}

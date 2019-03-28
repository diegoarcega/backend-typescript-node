import { Component } from '@nestjs/common'
import { HttpException } from '@nestjs/core'
import * as uuid from 'uuid'
import { database } from '../database/sqlite'

@Component()
export class UsersService {
  public getAllUsers() {
    return new Promise((resolve, reject) => {
      database.all('SELECT * FROM user', (err, rows) => {
        return !err ? resolve(rows) : reject(new HttpException(err, 500))
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

  public createUser(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      database.run(
        'INSERT INTO user(id, name, email, password, role) VALUES(?, ?, ?, ?, \'user\')',
        [uuid.v1().replace(/-/g, ''), name, email, password],
        err => !err ? resolve({ message: 'user has been registered'}) : reject(new HttpException(err, 500))
      )
    })
  }
}

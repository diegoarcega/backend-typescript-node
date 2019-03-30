import { Injectable, NestMiddleware } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}
  use() {
    console.log('use')
    return (req, res, next) => {
      console.log('use return')
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'mysecret', (err, payload) => {
          if (!err) {
            req.payload = payload
            next()
          } else {
            return res.status(403).json(err)
          }
        })
      } else {
        return res.status(401).json('You must provide a valid auth access token')
      }
    }
  }
}
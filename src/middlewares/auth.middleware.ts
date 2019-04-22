import * as jwt from 'jsonwebtoken'
import config from '../modules/config'

export function AuthMiddleware(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.jwtSecret, (err, payload) => {
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

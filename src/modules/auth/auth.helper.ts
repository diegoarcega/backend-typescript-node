import * as jwt from 'jsonwebtoken'

export class AuthHelper {
  generateToken(user) {
    return {
      token: jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
      }, 'mysecret')
    }
  }
}

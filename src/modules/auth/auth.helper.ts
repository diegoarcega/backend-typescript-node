import * as jwt from 'jsonwebtoken'
import { UserInterface } from '../users/users.interface';

interface AuthInterface {
  generateToken(user: UserInterface): TokenInterface,
}

export interface TokenInterface {
  token: string,
}

export class AuthHelper implements AuthInterface {
  generateToken(user: UserInterface): TokenInterface {
    return {
      token: jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
      }, process.env.JWT_SECRET)
    }
  }
}

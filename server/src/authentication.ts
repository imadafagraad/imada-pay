import * as express from 'express'
import * as jwt from 'jsonwebtoken'

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export enum AuthScope {
  /** Read all userdata */
  UsersRead = 'users:read',
  /** Read userdata of authorized user */
  UsersReadMe = 'users:read:me',
  /** Modify all users */
  UsersWrite = 'users:write',
  /** Modify userdata of authorized user */
  UsersWriteMe = 'users:write:me',

  /** Make payments on behalf of all users */
  PaymentsPay = 'payments:pay',
  /** Make payments on behalf of authorized user */
  PaymentsPayMe = 'payments:pay:me',
  /** List payments of all users */
  PaymentsList = 'payments:list',
  /** List payments of authorized user */
  PaymentsListMe = 'payments:list:me',
}

export const authScopes = {
  user: [
    AuthScope.UsersReadMe,
    AuthScope.UsersWriteMe,
    AuthScope.PaymentsListMe,
  ],
  admin: Object.values(AuthScope),
}

interface JwtAccessTokenPayload {
  scopes: AuthScope[]
}

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> {
  const scopes = _scopes as AuthScope[]

  if (securityName != 'jwt')
    return Promise.reject(new AuthenticationError('invalid security name'))

  let token: string =
    request.body.token ||
    request.query.token ||
    request.headers['authorization']

  if (token.toLowerCase().startsWith('bearer ')) {
    token = token.slice('bearer '.length)
  }

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new AuthenticationError('No token provided'))
    }
    jwt.verify(token, '[secret]', function (err: any, decoded: any) {
      if (err) {
        reject(err)
      } else {
        // Check if JWT contains all required scopes
        for (let scope of scopes ?? []) {
          if (!decoded.scopes.includes(scope)) {
            reject(
              new AuthenticationError(
                `JWT does not contain required scope (${scope}).`
              )
            )
          }
        }
        resolve(decoded)
      }
    })
  })
}

export function makeJwtToken(
  userId: number,
  scopes: AuthScope[],
  expiresIn: string | number
): string {
  const payload: JwtAccessTokenPayload = {
    scopes,
  }

  return jwt.sign(payload, '[secret]', {
    subject: userId.toString(),
    expiresIn,
  })
}

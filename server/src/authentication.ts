import * as express from 'express'
import * as jwt from 'jsonwebtoken'

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName != 'jwt')
    return Promise.reject(new AuthenticationError('invalid security name'))

  const token =
    request.body.token ||
    request.query.token ||
    request.headers['x-access-token']

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

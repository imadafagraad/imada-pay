/**
 * Response body when user successfully authorized
 */
export class AuthTokenResponseDTO {
  /**
   * The JWT token used to authenticate the newly registered user
   * @example 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.VzdiNEOc4GJMhU5ovtnioXMXWD6SJzdkaGtY32NaEuk'
   */
  token: string

  constructor(token: string) {
    this.token = token
  }
}

import { IsEmail, IsNotEmpty } from 'class-validator'

/**
 * Parameters needed to authenticate a new user
 */
export class LoginUserDto {
  /**
   * The email of the user
   * @example abc10@student.sdu.dk
   */
  @IsEmail()
  email!: string

  /**
   * The password of the user
   * @example 'mypassword'
   */
  @IsNotEmpty()
  password!: string
}

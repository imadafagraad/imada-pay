import { IsEmail, IsNotEmpty } from 'class-validator'

/**
 * Parameters needed to create a new user
 */
export class CreateUserDto {
  /**
   * The name of the user
   * @example 'John Doe'
   */
  @IsNotEmpty()
  name: string

  /**
   * The email of the user
   * @example abc10@student.sdu.dk
   */
  @IsEmail()
  email: string

  /**
   * The code for the scanned RFID student card
   * @example 123-45-678
   */
  @IsNotEmpty()
  rfidCard: string

  /**
   * The desired password of the user
   */
  @IsNotEmpty()
  password: string
}

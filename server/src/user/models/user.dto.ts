import { User } from '@prisma/client'

/**
 * The user object returned in requests
 */
export class UserDTO {
  /**
   * The name of the user
   * @example 'John Doe'
   */
  name: string

  /**
   * The email of the user
   * @example abc10@student.sdu.dk
   */
  email: string

  /**
   * The code for the scanned RFID student card
   * @example 123-45-678
   */
  rfidCard: string

  constructor(user: User) {
    this.name = user.name
    this.email = user.email
    this.rfidCard = user.rfidCard
  }
}

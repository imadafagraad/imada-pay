import { PrismaService } from './../prisma.service'
import { Injectable } from '@nestjs/common'
import { AuthToken, Prisma } from '@prisma/client'

@Injectable()
export class AuthTokenService {
  constructor(private prisma: PrismaService) {}

  async authToken(
    authTokenWhereUniqueInput: Prisma.AuthTokenWhereUniqueInput
  ): Promise<AuthToken | null> {
    return this.prisma.authToken.findUnique({
      where: authTokenWhereUniqueInput,
    })
  }

  async authTokens(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AuthTokenWhereUniqueInput
    where?: Prisma.AuthTokenWhereInput
    orderBy?: Prisma.AuthTokenOrderByWithRelationInput
  }): Promise<AuthToken[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.authToken.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createToken(data: Prisma.AuthTokenCreateInput): Promise<AuthToken> {
    return this.prisma.authToken.create({
      data,
    })
  }

  async updateToken(params: {
    where: Prisma.AuthTokenWhereUniqueInput
    data: Prisma.AuthTokenUpdateInput
  }): Promise<AuthToken> {
    const { where, data } = params
    return this.prisma.authToken.update({
      data,
      where,
    })
  }

  async deleteToken(
    where: Prisma.AuthTokenWhereUniqueInput
  ): Promise<AuthToken> {
    return this.prisma.authToken.delete({
      where,
    })
  }
}

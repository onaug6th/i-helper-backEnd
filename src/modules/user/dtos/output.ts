import {
  ApiProperty,
  ApiQuery,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';

export class UserInfoOutput {
  /**
   * 用户id
   */
  @ApiProperty({ description: '用户id' })
  userId: string;
  /**
   * 用户名
   */
  @ApiProperty({ description: '用户名' })
  name: string;
  /**
   * 性别
   */
  @ApiProperty({ description: '性别' })
  sex: number;
  /**
   * 头像
   */
  @ApiProperty({ description: '头像' })
  avatar: string;
  /**
   * 邮箱
   */
  @ApiProperty({ description: '邮箱' })
  email: string;
  /**
   * 登录token
   */
  @ApiProperty({ description: '登录token' })
  token: string;
}

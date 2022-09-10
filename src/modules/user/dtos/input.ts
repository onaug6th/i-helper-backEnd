import { ApiProperty } from '@nestjs/swagger';

export class RegisterInput {
  @ApiProperty({ description: '用户名' })
  name: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '用户头像' })
  avatar: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: 'openId' })
  openId: string;

  @ApiProperty({ description: '性别' })
  sex: number;
}

export class LoginInput {
  @ApiProperty({ description: '邮箱' })
  email: string;
  @ApiProperty({ description: '密码' })
  password: string;
}
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { RegisterInput, LoginInput } from 'src/modules/user/dtos/input';
import { UserInfoOutput } from 'src/modules/user/dtos/output';
import { PageInput } from 'src/common/dtos/page.input';
import { PageOutput } from 'src/common/dtos/page.output';

import { AuthGuard } from 'src/guard/auth.guard';
// @UseGuards(AuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info/bytoken')
  @ApiOperation({ summary: '根据token获取用户信息' })
  @ApiQuery({ description: '登录token' })
  async getUserByToken(@Query() token: string): Promise<UserInfoOutput> {
    return this.getUserByToken(token);
  }

  @Get('list')
  @ApiOperation({ summary: '获取用户集合' })
  @ApiQuery({ description: '参数', type: PageInput })
  async getUsers(
    @Query() input: PageInput,
  ): Promise<PageOutput<UserInfoOutput>> {
    return this.userService.getUserInfos(input);
  }

  //  POST /user/:id
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户信息' })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  //  POST /user/register
  @Post('register')
  @ApiOperation({ summary: '注册用户' })
  @ApiBody({ description: '输入参数', type: RegisterInput })
  async register(@Body() user: RegisterInput) {
    return this.userService.register(user);
  }

  //  POST /user/login
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ description: '输入参数', type: LoginInput })
  async login(@Body() user: LoginInput) {
    return this.userService.login(user);
  }
}

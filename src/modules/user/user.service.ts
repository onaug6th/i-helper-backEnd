import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TUser } from '../../storage/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PageInput } from '../../common/dtos/page.input';
import { PageOutput } from '../../common/dtos/page.output';
import { UserInfoOutput } from './dtos/output';
import { RegisterInput, LoginInput } from './dtos/input';

function userHandler(user: TUser): UserInfoOutput {
  return user ? {
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    token: user.token,
    sex: user.sex,
    userId: user.id,
  } : null;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TUser)
    private readonly userRepository: Repository<TUser>,
  ) {}

  /**
   * 保存用户信息
   * @param input
   */
  async saveUserAsync(input: any): Promise<UserInfoOutput> {
    let user = await this.userRepository.findOne({
      wechatOpenId: input.openId,
    });
    if (!user) {
      user = <TUser>{
        avatar: input.avatar,
        name: input.name,
        wechatOpenId: input.openId,
        token: uuidv4(),
        sex: input.sex,
      };
      await this.userRepository.insert(user);
    }

    return userHandler(user);
  }

  /**
   * 根据token获取用户信息
   * @param token
   */
  async getUserByToken(token: string): Promise<UserInfoOutput> {
    let user = await this.userRepository.findOne({ token });

    return userHandler(user);
  }

  /**
   * 分页获取用户列表
   * @param input
   */
  async getUserInfos(input: PageInput): Promise<PageOutput<UserInfoOutput>> {
    let queryResult = await this.userRepository.findAndCount({
      order: {
        createTime: 'DESC',
      },
      skip: (input.index - 1) * input.size,
      take: input.size,
    });

    let data = queryResult[0].map(
      (user) =>
        <UserInfoOutput>{
          avatar: user.avatar,
          name: user.name,
          token: user.token,
          userId: user.id,
        },
    );

    return new PageOutput<UserInfoOutput>(queryResult[1], data);
  }

  /**
   * 根据id获取用户信息
   * @param id
   * @returns
   */
  async getUserById(id: string): Promise<UserInfoOutput> {
    const user = await this.userRepository.findOne(id);

    return userHandler(user);
  }

  /**
   * 获取用户
   */
  async getUser(where): Promise<TUser> {
    return await this.userRepository.findOne(where);
  }

  /**
   * 根据邮箱获取用户信息
   * @param email
   * @returns
   */
  async getUserByEmail(email: string): Promise<UserInfoOutput> {
    const user = await this.getUser({ email });

    return userHandler(user);
  }

  /**
   * 用户注册
   * @param body
   */
  async register(body: RegisterInput): Promise<any> {
    const { name, password, email } = body;

    if(await this.getUserByEmail(email)) {
      throw new HttpException('邮箱已被注册', HttpStatus.BAD_REQUEST);
    }

    const regEntity = <TUser>{
      name,
      password,
      email
    };
    await this.userRepository.insert(regEntity);

    return regEntity;
  }

  /**
   * 用户登录
   * @param user 
   * @returns 
   */
  async login(user: LoginInput): Promise<any> {
    const { email, password } = user;
    const userResult = await this.getUser({ email });
    if(!userResult) {
      throw new HttpException('不存在该邮箱', HttpStatus.BAD_REQUEST);
    }

    if(userResult.password !== password) {
      throw new HttpException('账号或密码不正确', HttpStatus.BAD_REQUEST);
    }

    return this.getUserByEmail(email);
  }
}

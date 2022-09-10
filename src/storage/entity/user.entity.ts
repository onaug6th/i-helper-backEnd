import { Entity, Column } from 'typeorm';
import { TEntity } from './base.entity';

@Entity()
export class TUser extends TEntity {
  /**
   * 昵称
   */
  @Column()
  name: string;
  /**
   * 密码
   */
  @Column()
  password: string;
  /**
   * 邮箱
   */
  @Column()
  email: string;
  /**
   * 性别
   * 1男2女
   */
  @Column({
    default: 1,
  })
  sex: number;
  /**
   * 头像地址
   */
  @Column({
    default: '',
  })
  avatar: string;
  /**
   * 微信公众号openid
   */
  @Column({
    default: '',
  })
  wechatOpenId: string;
  /**
   * 绑定的token
   */
  @Column({
    default: '',
  })
  token: string;
}

import { Entity, Column } from 'typeorm';
import { TEntity } from './base.entity';

@Entity()
export class TPluginReg extends TEntity {
  /**
   * 插件名称
   */
  @Column()
  name: string;
  /**
   * 插件版本号
   */
  @Column()
  version: string;
  /**
   * 插件描述
   */
  @Column()
  desc: string;
  /**
   * readme内容
   */
  @Column()
  readmeContent: string;
  /**
   * 插件包url
   */
  @Column()
  fileUrl: string;
  /**
   * 作者id
   */
  @Column({
    default: '',
  })
  authorId: string;
  /**
   * 插件头像地址
   */
  @Column()
  logo: string;
  /**
   * 插件字节数
   */
  @Column()
  size: number;

  /**
   * 评分总和
   */
  @Column({
    default: 0
  })
  rateTotal: number;

  /**
   * 评分次数
   */
   @Column({
    default: 0
  })
  rateTimes: number;

  /**
   * 下载量
   */
  @Column({
    default: 0,
  })
  downloads: number;
}

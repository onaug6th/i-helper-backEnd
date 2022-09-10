import { Entity, Column } from 'typeorm';
import { TEntity } from './base.entity';

@Entity()
export class TReviewReg extends TEntity {
  /**
   * 审批状态
   * 0 审核中
   * 1 审核通过
   * 2 不通过
   */
  @Column({
    default: 0,
  })
  status: number;


  /**
   * 审核内容
   */
   @Column({
    default: '',
  })
  content: string;

  /**
   * 插件id
   */
  @Column({
    default: '',
  })
  pluginId: string;

  /**
   * 插件名称
   */
  @Column({
    default: '',
  })
  pluginName: string;

  /**
   * 插件版本号
   */
  @Column()
  pluginVersion: string;

  /**
   * 插件描述
   */
  @Column()
  pluginDesc: string;

  /**
   * 插件审核描述
   */
  @Column()
  auditDesc: string;

  /**
   * 插件说明内容
   */
  @Column()
  readmeContent: string;

  /**
   * 作者id
   */
  @Column({
    default: '',
  })
  authorId: string;

  /**
   * 作者名称
   */
  @Column({
    default: '',
  })
  authorName: string;

  /**
   * 插件包url
   */
  @Column()
  fileUrl: string;

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
}

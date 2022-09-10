import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TPluginReg } from '../entity/plugin.entity';
import { TUser } from '../entity/user.entity';
import { TReviewReg } from '../entity/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      //  数据库服务的地址
      host: 'xxx.xxx.xxx.xx',
      //  数据库服务的端口号
      port: 9306,
      //  数据库连接账号
      username: 'admin',
      //  数据库连接账号密码
      password: 'password',
      //  数据库表名
      database: 'ihelper',
      entities: [TUser, TPluginReg, TReviewReg],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TUser, TPluginReg, TReviewReg]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}

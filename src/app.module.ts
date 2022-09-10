import { Module, HttpModule } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PluginModule } from './modules/plugin/plugin.module';
import { UserModule } from './modules/user/user.module';
import { WeixinModule } from './modules/weixin/weixin.module';
import { ReviewModule } from './modules/review/review.module';
@Module({
  imports: [
    HttpModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'wwwroot'),
    // }),
    PluginModule,
    UserModule,
    WeixinModule,
    ReviewModule
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService]
})
export class AppModule {}

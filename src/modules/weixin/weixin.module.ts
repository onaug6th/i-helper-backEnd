import { Module, HttpModule } from '@nestjs/common';
import { WxOAuthLib } from './oauth/oauth.lib';
import { WxOptions } from './options/wx.options';
import { WeixinController } from "./weixin.controller";
import { UserService } from '../user/user.service';
import { DbModule } from '../../storage/module/db.module';

const wxOptionsProvider = {
    provide: WxOptions,
    useValue: <WxOptions>{
        AppId: 'wxa8bb7d50744748fb',
        AppSecret: 'c7ac007e26b59b7a14aa4f92d70c3018'
    },
};

@Module({
    imports: [HttpModule, DbModule],
    providers: [wxOptionsProvider, WxOAuthLib, UserService],
    controllers: [WeixinController],
    exports: [wxOptionsProvider, WxOAuthLib]
})
export class WeixinModule { }

import { Controller, Get, Query } from '@nestjs/common';
import { WxOAuthLib } from './oauth/oauth.lib';
import { UserService } from 'src/modules/user/user.service';
import { ApiTags, ApiQuery, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UserInfoOutput } from 'src/modules/user/dtos/output';

@ApiTags('weixin')
@Controller('weixin')
export class WeixinController {
    constructor(
        private readonly wxOauthLib: WxOAuthLib,
        private readonly userService: UserService,
    ) { }

    @ApiOperation({ summary: '根据微信code获取用户信息' })
    @ApiQuery({ description: "换取access_token的票据", name: "code" })
    @ApiQuery({ description: "暂时没有什么卵用", name: "state" })
    @ApiCreatedResponse({ status: 200, type: UserInfoOutput })
    @Get("login")
    async wxLogin(@Query('code') code: string, @Query('state') state: string): Promise<UserInfoOutput> {
        var accessTokenResult = await this.wxOauthLib.getAccessToken(code);
        var wxUserInfo = await this.wxOauthLib.getUserInfo(accessTokenResult.access_token, accessTokenResult.openid);
        //这里干点注册用户啥的
        var userInfo = await this.userService.saveUserAsync({
            openId: wxUserInfo.openid,
            name: wxUserInfo.nickname,
            avatar: wxUserInfo.headimgurl,
            sex: wxUserInfo.sex
        });
        return userInfo;
    }

    @ApiOperation({ summary: '获取微信登录地址' })
    @ApiQuery({ description: "登录完成后的跳转地址", name: "url" })
    @ApiCreatedResponse({ status: 200, type: String })
    @Get('loginUrl')
    getWxRedirectUrl(@Query('url') url: string): string {
        var wxurl = `http://xxx/wxlogin.html?redUrl=${encodeURIComponent(url)}`;
        return this.wxOauthLib.getAuthorizeUrl(wxurl);
    }


}

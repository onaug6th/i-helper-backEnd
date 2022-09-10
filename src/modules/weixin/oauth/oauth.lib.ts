import { WxLibCore } from "../core/wx.core";
import { AccessTokenResult } from "./dtos/accessToken.result";
import { UserInfoResult } from "./dtos/userInfo.result";

export class WxOAuthLib extends WxLibCore {

    /**
     * 获取AccessToken
     * @param code code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
     * @param grantType 填写为authorization_code（请保持默认参数）
     * @returns 
     */
    async getAccessToken(code: string, grantType: string = "authorization_code"): Promise<AccessTokenResult> {
        return <AccessTokenResult>await this.CallApi(`/sns/oauth2/access_token?appid=${this.options.AppId}&secret=${this.options.AppSecret}&code=${code}&grant_type=${grantType}`);
    }

    /**
     * 刷新（OAuth专用）access_token
     * @param refreshToken 填写通过access_token获取到的refresh_token参数
     * @param grantType 填写为refresh_token（请保持默认参数）
     * @returns 
     */
    async refreshToken(refreshToken: string, grantType: string = "refresh_token"): Promise<AccessTokenResult> {
        return <AccessTokenResult>await this.CallApi(`/sns/oauth2/refresh_token?appid=${this.options.AppId}&grant_type=${grantType}&refresh_token=${refreshToken}`);
    }

    /**
     * 获取用户基本信息
     * @param oauthAccessToken 调用接口凭证（OAuth专用）
     * @param openId 普通用户的标识，对当前公众号唯一
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     * @returns 
     */
    async getUserInfo(oauthAccessToken: string, openId: string, lang: string = "zh_CN"): Promise<UserInfoResult> {
        return <UserInfoResult>await this.CallApi(`/sns/userinfo?access_token=${oauthAccessToken}&openid=${openId}&lang=${lang}`);
    }

    /**
     * 检验授权凭证（access_token）是否有效（OAuth专用）
     * @param oauthAccessToken 调用接口凭证（OAuth专用）
     * @param openId 用户的唯一标识
     * @returns 
     */
    async auth(oauthAccessToken: string, openId: string): Promise<void> {
        await this.CallApi(`/sns/auth?access_token=${oauthAccessToken}&openid=${openId}`);
    }

    /**
     * 获取登录跳转地址
     * @param redirectUrl 授权后重定向的回调链接地址，请使用urlencode对链接进行处理
     * @param state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
     * @param scope 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
     * @returns 
     */
    getAuthorizeUrl(redirectUrl: string, state: string = "", scope: string = "snsapi_userinfo"): string {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.options.AppId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    }

}
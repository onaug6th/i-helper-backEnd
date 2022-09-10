import { BaseResult } from "../../core/result.core"

export class AccessTokenResult extends BaseResult {
    /**
     * 接口调用凭证
     */
    access_token: string
    /**
     * access_token接口调用凭证超时时间，单位（秒）
     */
    expires_in: number
    /**
     * 用户刷新access_token
     */
    refresh_token: string
    /**
     * 授权用户唯一标识
     */
    openid: string
    /**
     * 用户授权的作用域，使用逗号（）分隔
     */
    scope: string
    /**
     * 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。详见：获取用户个人信息（UnionID机制）
     */
    unionid: string
}
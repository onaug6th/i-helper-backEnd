import { BaseResult } from "../../core/result.core"

export class UserInfoResult extends BaseResult {
    /**
     * 用户的唯一标识
     */
    openid: string
    /**
     * 用户昵称
     */
    nickname: string
    /**
     * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
     */
    sex: number
    /**
     * 用户个人资料填写的省份
     */
    province: string
    /**
     * 普通用户个人资料填写的城市
     */
    city: string
    /**
     * 国家，如中国为CN
     */
    country: string
    /**
     * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
     */
    headimgurl: string
    /**
     * 用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
     * 作者注：其实这个格式称不上JSON，只是个单纯数组。
     */
    privilege: string[]
    /**
     * 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。详见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&amp;t=resource/res_list&verify=1&amp;lang=zh_CN
     */
    unionid: string
}
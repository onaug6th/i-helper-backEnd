import { HttpService, Injectable } from "@nestjs/common";
import { BaseResult } from "./result.core";
import { WxOptions } from "../options/wx.options";
import { Method } from 'axios';

@Injectable()
export class WxLibCore {
    constructor(protected readonly options: WxOptions, protected readonly httpService: HttpService) { }

    private _baseHost = "https://api.weixin.qq.com"

    /**
     * 请求wx api
     * @param path api路径
     * @param body 请求body
     * @param method 请求方式，默认get
     * @returns 
     */
    protected async CallApi(path: string, body: any = null, method: Method = "get"): Promise<BaseResult> {
        let requestParams = {
            baseURL: this._baseHost
        }
        if (body) {
            requestParams['data'] = body;
        }

        const response = await this.httpService.request({
            method,
            baseURL: this._baseHost,
            url: path
        }).toPromise()

        const result = <BaseResult>response.data
        if (result.errcode != 0) {
            throw Error(result.errmsg)
        }

        return result
    }
}
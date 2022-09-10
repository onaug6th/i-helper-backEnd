import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TPluginReg } from 'src/storage/entity/plugin.entity';
import { PluginSaveInput } from './dtos/input';
import { byteConvert } from 'src/utils';
import { UserService } from '../user/user.service';

@Injectable()
export class PluginService {
  constructor(
    @InjectRepository(TPluginReg)
    private readonly pluginRepository: Repository<TPluginReg>,
    private readonly userService: UserService,
  ) {}

  /**
   * 获取插件列表
   * @returns
   */
  async getPluginList() {
    const pluginList: Array<any> = await this.pluginRepository.find();

    for (let i = 0; i < pluginList.length; i++) {
      const plugin = pluginList[i];
      const user = await this.userService.getUser({ id: plugin.authorId });
      if (user) {
        plugin.authorName = user.name;
      }
      //  评分的计算公式：（评分值的总和）/评分次数
      plugin.rate = plugin.rateTotal ? plugin.rateTotal / plugin.rateTimes : 0;
      plugin.sizeFormat = byteConvert(plugin.size);
    }
    return pluginList;
  }

  /**
   * 根据id获取插件
   * @param id
   * @returns
   */
  async getPluginById(id: string) {
    const result = await this.pluginRepository.findOne(id);
    return result;
  }

  /**
   * 新增插件
   * @param body
   */
  async addPlugin(body: PluginSaveInput): Promise<any> {
    const regEntity = <TPluginReg>body;
    await this.pluginRepository.insert(regEntity);

    return regEntity;
  }

  /**
   * 更新插件
   * @param id
   * @param body
   */
  async updatePlugin(id: string, body: PluginSaveInput): Promise<void> {
    await this.pluginRepository.update(id, body);
  }

  /**
   * 删除插件
   * @param id
   */
  async deleteOne(id: string): Promise<void> {
    await this.pluginRepository.delete(id);
  }

  /**
   * 新增插件或更新插件
   * @param plugin
   */
  async insertOrUpdate(plugin: PluginSaveInput): Promise<void> {
    const isExitPlugin = await this.getPluginById(plugin.id);

    //  存在插件，更新插件信息
    if (isExitPlugin) {
      await this.updatePlugin(isExitPlugin.id, {
        ...plugin,
        downloads: isExitPlugin.downloads
      });
    }
    //  新增插件
    else {
      await this.addPlugin(plugin);
    }
  }

  /**
   * 下载函数，更新插件的下载数量
   * @param pluginId
   */
  async downloadIncrease(pluginId: string) {
    const plugin = await this.getPluginById(pluginId);
    this.updatePlugin(pluginId, {
      ...plugin,
      downloads: plugin.downloads + 1
    });
  }

  /**
   * 更新插件的评分总和
   * @param pluginId
   */
   async rateUpdate(pluginId: string, rate: number) {
    const plugin = await this.getPluginById(pluginId);

    this.updatePlugin(pluginId, {
      ...plugin,
      rateTotal: plugin.rateTotal + rate,
      rateTimes: plugin.rateTimes + 1
    });
  }
}

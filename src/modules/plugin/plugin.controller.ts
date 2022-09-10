//  https://juejin.cn/post/6885751452015263758#heading-17

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { PluginSaveInput } from 'src/modules/plugin/dtos/input';
import { PluginService } from 'src/modules/plugin/plugin.service';

interface Response<T = unknown> {
  code: number;
  data?: T;
  success: boolean;
  message: string;
}

//  文档的大类
@ApiTags('plugin')
//  统一的路由前缀
@Controller('plugin')
//  暂时把身份验证去掉
// @UseGuards(AuthGuard)
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  //  GET /plugin/list
  @Get('list')
  @ApiOperation({ summary: '获取插件列表' })
  async getPlugin() {
    return this.pluginService.getPluginList();
  }

  //  GET /plugin/:id
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取插件信息' })
  async getPluginById(@Param('id') id: string) {
    return this.pluginService.getPluginById(id);
  }

  //  POST /plugin/add
  @Post('add')
  @ApiOperation({ summary: '新增插件' })
  @ApiBody({ description: '输入参数', type: PluginSaveInput })
  async addPlugin(@Body() input: PluginSaveInput) {
    return this.pluginService.addPlugin(input);
  }

  // PUT /plugin/:id
  @Put(':id')
  @ApiOperation({ summary: '修改插件' })
  async updatePlugin(@Param('id') id: string, @Body() body: PluginSaveInput) {
    return this.pluginService.updatePlugin(id, body);
  }

  // DELETE /plugin/:id
  @Delete(':id')
  @ApiOperation({ summary: '删除插件' })
  async deleteOne(@Param('id') id: string) {
    return await this.pluginService.deleteOne(id);
  }

  // PUT /plugin/downloads/:id
  @Put('/downloads/:id')
  @ApiOperation({ summary: '修改插件' })
  async downloadPlugin(@Param('id') id: string) {
    return this.pluginService.downloadIncrease(id);
  }
}

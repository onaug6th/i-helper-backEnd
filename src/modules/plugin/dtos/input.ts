import { ApiProperty } from '@nestjs/swagger';

export class PluginSaveInput {
  @ApiProperty({ description: '插件ID' })
  id: string;

  @ApiProperty({ description: '插件名称' })
  name: string;

  @ApiProperty({ description: '插件版本号' })
  version: string;

  @ApiProperty({ description: '插件描述' })
  desc: string;

  @ApiProperty({ description: '插件包地址' })
  fileUrl: string;

  @ApiProperty({ description: '作者id' })
  authorId: string;

  @ApiProperty({ description: 'readme内容' })
  readmeContent: string;

  @ApiProperty({ description: '插件图标地址' })
  logo: string;

  @ApiProperty({ description: '插件体积' })
  size: number;

  @ApiProperty({ description: '评分总和' })
  rateTotal: number;

  @ApiProperty({ description: '评分次数' })
  rateTimes: number;

  @ApiProperty({ description: '下载量' })
  downloads: number;
}

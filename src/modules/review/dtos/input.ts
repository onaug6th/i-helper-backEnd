import { ApiProperty } from '@nestjs/swagger';

export class ReviewUpdate {
  @ApiProperty({ description: '审核ID' })
  id: string;

  @ApiProperty({ description: '是否审核通过' })
  pass: boolean;

  @ApiProperty({ description: '审核内容' })
  content: string;
}

export class ReviewAdd {
  @ApiProperty({ description: '插件ID' })
  id: string;

  @ApiProperty({ description: '插件名称' })
  name: string;

  @ApiProperty({ description: '作者ID' })
  authorId: string;

  @ApiProperty({ description: '插件版本号' })
  version: string;

  @ApiProperty({ description: '插件的描述' })
  desc: string;

  @ApiProperty({ description: 'readme内容' })
  readmeContent: string;
}

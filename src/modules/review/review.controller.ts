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
import { ReviewUpdate, ReviewAdd } from './dtos/input';
import { ReviewService } from './review.service';

interface Response<T = unknown> {
  code: number;
  data?: T;
  success: boolean;
  message: string;
}

//  文档的大类
@ApiTags('review')
//  统一的路由前缀
@Controller('review')
//  暂时把身份验证去掉
// @UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //  GET /review/list
  @Get('list')
  @ApiOperation({ summary: '获取审批列表' })
  async getReviewList() {
    return this.reviewService.getReviewList();
  }

  //  GET /review/pluginId/:pluginId
  @Get('pluginId/:pluginId')
  @ApiOperation({ summary: '根据插件ID获取该插件最新的审批' })
  async getReviewByPluginId(@Param('pluginId') pluginId: string) {
    return this.reviewService.getReviewByPluginId(pluginId);
  }

  //  POST /review/add
  @Post('add')
  @ApiOperation({ summary: '新增审核' })
  @ApiBody({ description: '输入参数', type: ReviewAdd })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'zip' }, { name: 'logo' }]))
  async publish(
    @UploadedFiles() files,
    @Body() body: ReviewAdd,
  ): Promise<Response<any>> {
    const {
      zip: { 0: zip },
      logo: { 0: logo },
    } = files;

    return this.reviewService.addReview({ zip, logo, body });
  }

  //  POST /review/update
  @Post('update')
  @ApiOperation({ summary: '更新插件审核' })
  @ApiBody({ description: '输入参数', type: ReviewUpdate })
  async addPlugin(@Body() input: ReviewUpdate) {
    return this.reviewService.reviewUpdate(input);
  }
}

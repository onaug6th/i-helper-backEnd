import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TReviewReg } from 'src/storage/entity/review.entity';
import { getFileType, cosUpload } from 'src/utils';
import { UserService } from '../user/user.service';
import { PluginService } from '../plugin/plugin.service';
import { ReviewUpdate } from './dtos/input';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(TReviewReg)
    private readonly reviewRepository: Repository<TReviewReg>,
    private readonly pluginService: PluginService,
    private readonly userService: UserService,
  ) {}

  /**
   * 新增审批
   */
  async addReview({ zip, logo, body }): Promise<any> {
    const fileType = getFileType(zip.originalname);
    const id = body.id;

    if (fileType !== 'zip') {
      throw new HttpException('压缩包类型不为zip', HttpStatus.BAD_REQUEST);
    }

    const prefix = `${id}-`;
    const fileUrl = await cosUpload(prefix + 'zip.zip', zip.buffer, zip.size);
    const logoUrl = await cosUpload(
      prefix + `logo.${getFileType(logo.originalname)}`,
      logo.buffer,
      logo.size,
    );

    const author = await this.userService.getUserById(body.authorId);

    //  kpc yyds
    if (body.auditDesc === 'kpcDev') {
      const pluginData = {
        id: id,
        name: body.name,
        version: body.version,
        desc: body.desc,
        readmeContent: body.readmeContent,
        fileUrl,
        authorId: author.userId,
        logo: logoUrl,
        size: zip.size,
        rateTotal: 0,
        rateTimes: 0,
        downloads: 0
      };
      this.pluginService.insertOrUpdate(pluginData);
    } else {
      const data = {
        pluginId: id,
        pluginName: body.name,
        pluginVersion: body.version,
        pluginDesc: body.desc,
        auditDesc: body.auditDesc,
        readmeContent: body.readmeContent,
        authorId: author.userId,
        authorName: author.name,
        fileUrl,
        logo: logoUrl,
        size: zip.size,
      };

      await this.reviewRepository.insert(data);
    }
  }

  /**
   * 根据审批ID获取审批
   * @param id
   * @returns
   */
  getReview(id: string): Promise<TReviewReg> {
    return this.reviewRepository.findOne(id);
  }

  /**
   * 根据插件ID获取审批
   * @param id
   * @returns
   */
  getReviewByPluginId(pluginId: string): Promise<TReviewReg> {
    return this.reviewRepository.findOne({ pluginId }, {
      order: {
        createTime: "DESC"
      }
    });
  }

  /**
   * 获取审批列表
   * @returns
   */
  async getReviewList() {
    const pluginList: Array<TReviewReg> = await this.reviewRepository.find();

    return pluginList;
  }

  /**
   * 更新审批
   * @param id 审批id
   * @param pass 是否审核通过
   */
  async reviewUpdate({ id, pass, content }: ReviewUpdate): Promise<void> {
    const review = await this.getReview(id);

    //  审核通过
    if (pass) {
      const pluginData = {
        id: review.pluginId,
        name: review.pluginName,
        version: review.pluginVersion,
        desc: review.pluginDesc,
        readmeContent: review.readmeContent,
        fileUrl: review.fileUrl,
        authorId: review.authorId,
        logo: review.logo,
        size: review.size,
        rateTotal: 0,
        rateTimes: 0,
        downloads: 0
      };

      this.pluginService.insertOrUpdate(pluginData);
    }

    let status: number;

    if (pass) {
      status = 1;
    } else {
      status = 2;
      content = content || "插件审核不通过";
    }

    //  更新审批
    await this.reviewRepository.update(id, { status, content });
  }
}

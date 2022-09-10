import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { DbModule } from '../../storage/module/db.module';
import { UserService } from '../user/user.service';
import { PluginService } from '../plugin/plugin.service';

@Module({
  imports: [DbModule],
  controllers: [ReviewController],
  providers: [ReviewService, UserService, PluginService]
})

export class ReviewModule {}

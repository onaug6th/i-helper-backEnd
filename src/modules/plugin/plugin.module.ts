import { Module } from '@nestjs/common';
import { PluginService } from './plugin.service';
import { PluginController } from './plugin.controller';
import { DbModule } from '../../storage/module/db.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DbModule],
  controllers: [PluginController],
  providers: [PluginService, UserService]
})

export class PluginModule {}

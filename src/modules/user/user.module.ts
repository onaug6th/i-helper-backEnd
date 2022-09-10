import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../../storage/module/db.module';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserService]
})

export class UserModule {}

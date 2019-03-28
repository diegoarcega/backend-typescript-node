import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // modules: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

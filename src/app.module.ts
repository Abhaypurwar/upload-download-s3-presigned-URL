import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}

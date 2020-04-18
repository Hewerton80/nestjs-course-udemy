import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { typeormConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}

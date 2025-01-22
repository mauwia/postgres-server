import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder/seeder.service';
import { GinModule } from './gin/gin.module';
import { TimeSeriesModule } from './time-series/time-series.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
         __dirname + '/**/*.view{.ts,.js}'
      ],
      synchronize: true,
    }),
    GinModule,
    TimeSeriesModule,
    // TypeOrmModule.forFeature([Addresses]),
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {
  constructor(private readonly seederService: SeederService) {}
  async onModuleInit() {
    await Promise.all([
      // this.seederService.initRecord(),
      // this.seederService.initRecord(),
    ]);
    console.log('AppModule has been initialized.');
  }
}

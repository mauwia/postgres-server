import { Module } from '@nestjs/common';
import { TimeSeriesController } from './time-series.controller';
import { TimeSeriesService } from './time-series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceHistory, CurrentBalance } from 'src/utils';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentBalance, BalanceHistory])],
  controllers: [TimeSeriesController],
  providers: [TimeSeriesService],
})
export class TimeSeriesModule {
  constructor(private readonly timeSeriesService: TimeSeriesService) {}
  onModuleInit() {
    
    this.timeSeriesService.updateBalance('0x1234', 125);

  }
}

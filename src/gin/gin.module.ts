import { Module } from '@nestjs/common';
import { GinService } from './gin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [GinService],
})
export class GinModule {
  constructor(private readonly ginService: GinService) {}
  async onModuleInit() {
    // this.ginService.generateSampleData();
    // let a = await this.ginService.searchArticles('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
    // console.log(a);  
  }
}

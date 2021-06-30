import { DynamicModule, Global, HttpModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS, DelyvaOptions } from './delyva.definition';
import { DelyvaService } from './delyva.service';

@Global()
@Module({})
export class DelyvaModule {
  static forRoot(options: DelyvaOptions): DynamicModule {
    return {
      module: DelyvaModule,
      imports: [HttpModule],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        DelyvaService,
      ],
      exports: [DelyvaService],
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/db.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}
  getDatabaseUrl(): string {
    console.log(this.configService.get<string>('DATABASE_URL'));
    return this.configService.get<string>('DATABASE_URL');
  }
}

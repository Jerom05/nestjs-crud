import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    const mockReflector = {} as Reflector;
    const mockConfigService = {} as ConfigService;
    expect(new ApiKeyGuard(mockReflector, mockConfigService)).toBeDefined();
  });
});

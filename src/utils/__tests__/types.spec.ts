import { describe, it, expect } from 'vitest';
import { NOTIFY_DURATION, API_TIMEOUT } from '../types';

describe('types', () => {
  describe('constants', () => {
    it('should export NOTIFY_DURATION as 3000', () => {
      expect(NOTIFY_DURATION).toBe(3000);
    });

    it('should export API_TIMEOUT as 30000', () => {
      expect(API_TIMEOUT).toBe(30000);
    });
  });
});

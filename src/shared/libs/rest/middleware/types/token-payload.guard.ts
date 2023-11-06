import { TokenPayload } from '../../../../models/auth/index.js';

export const isTokenPayload = (payload: unknown): payload is TokenPayload => (
  (typeof payload === 'object' && payload !== null) &&
  ('email' in payload && typeof payload.email === 'string') &&
  ('name' in payload && typeof payload.name === 'string') &&
  ('isPro' in payload && typeof payload.isPro === 'boolean') &&
  ('id' in payload && typeof payload.id === 'string')
);

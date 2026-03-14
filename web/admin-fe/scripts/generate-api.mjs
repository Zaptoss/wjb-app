/**
 * API client generation script.
 *
 * Uses @hey-api/openapi-ts (v0.73+) to generate a fully typed TypeScript
 * client from an OpenAPI 3.x specification.
 *
 * Usage:
 *   npm run generate:api
 *   OPENAPI_SPEC_URL=http://localhost:8000/openapi.json npm run generate:api
 *
 * Output: src/api-generated/  (gitignored — do not edit manually)
 *
 * NOTE: Starting with v0.73, @hey-api/client-axios is bundled inside
 * @hey-api/openapi-ts — no separate runtime package needed.
 */

import { createClient } from '@hey-api/openapi-ts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specSource =
  process.env['OPENAPI_SPEC_URL'] ??
  path.resolve(__dirname, '../../../docs/openapi.json');

console.log(`[generate-api] Reading spec from: ${specSource}`);

await createClient({
  input: specSource,
  output: path.resolve(__dirname, '../src/api-generated'),
  client: '@hey-api/client-axios',

  // Uncomment to generate @tanstack/react-query hooks alongside the client:
  // plugins: ['@tanstack/react-query'],
});

console.log('[generate-api] Done. Files written to src/api-generated/');

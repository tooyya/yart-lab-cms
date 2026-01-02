import * as migration_20260101_031805 from './20260101_031805';

export const migrations = [
  {
    up: migration_20260101_031805.up,
    down: migration_20260101_031805.down,
    name: '20260101_031805'
  },
];

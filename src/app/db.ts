import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'bungie_manifest',
  stores: {
    version: {
      primaryKey: 'hash'
    },
    items: {
      primaryKey: 'h'
    },
    talents: {
      primaryKey: 'h'
    },
    steps: {
      primaryKey: 'h'
    },
  }
};


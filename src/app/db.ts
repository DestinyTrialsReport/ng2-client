import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 3,
  name: 'trials_report',
  stores: {
    items: {
      autoIncrement: false,
      primaryKey: 'h'
    }
  }
};

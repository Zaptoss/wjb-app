import Dexie, { type Table } from 'dexie';
import type { FlowDraft } from '../types';

export class WjbAdminDb extends Dexie {
  flowDrafts!: Table<FlowDraft>;

  constructor() {
    super('wjb-admin');
    this.version(1).stores({
      flowDrafts: 'id, name, updatedAt, isDirty',
    });
  }
}

export const db = new WjbAdminDb();

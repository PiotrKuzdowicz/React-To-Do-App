import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient, removeOldestQuery } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string';

export const localStorageQueryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });
export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  retry: removeOldestQuery,
  // serialize: data => compress(JSON.stringify(data)),
  // deserialize: data => JSON.parse(decompress(data)),
})

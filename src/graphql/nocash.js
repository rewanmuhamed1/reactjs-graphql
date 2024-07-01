import { ApolloCache } from '@apollo/client';




export class NoCache extends ApolloCache {
    read() { return null; }
    write() { }
    diff() { return { result: null }; }
    watch() { return () => {}; }
    evict() { return false; }
    reset() { return Promise.resolve(); }
    removeOptimistic() { }
    performTransaction() { }
    recordOptimisticTransaction() { }
    transformDocument() { }
    identify() { return null; }
    gc() { return []; }
    modify() { return false; }
    transformForLink() { return {}; }
    broadcastWatches() { }
  }
(function () {
  const DL = (window.DL = window.DL || {});
  const DB_NAME = 'datalens';
  const DB_VERSION = 1;
  const STORE = 'kv';
  const SESSION_KEY = 'session';
  let dbPromise = null;

  function available() {
    return typeof indexedDB !== 'undefined';
  }

  function open() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!available()) return reject(new Error('IndexedDB not available'));
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  function tx(mode, fn) {
    return open().then(
      (db) =>
        new Promise((resolve, reject) => {
          const t = db.transaction(STORE, mode);
          const store = t.objectStore(STORE);
          let result;
          try {
            result = fn(store);
          } catch (e) {
            reject(e);
            return;
          }
          t.oncomplete = () => resolve(result && result.__req ? result.__req.result : result);
          t.onerror = () => reject(t.error);
          t.onabort = () => reject(t.error);
        })
    );
  }

  function set(key, value) {
    return tx('readwrite', (store) => store.put(value, key));
  }

  function get(key) {
    return tx('readonly', (store) => {
      const req = store.get(key);
      return { __req: req };
    });
  }

  function del(key) {
    return tx('readwrite', (store) => store.delete(key));
  }

  async function saveSession(session) {
    if (!available()) return false;
    try {
      await set(SESSION_KEY, session);
      return true;
    } catch (e) {
      return false;
    }
  }

  async function loadSession() {
    if (!available()) return null;
    try {
      const s = await get(SESSION_KEY);
      return s || null;
    } catch (e) {
      return null;
    }
  }

  async function clearSession() {
    if (!available()) return;
    try {
      await del(SESSION_KEY);
    } catch (e) {}
  }

  DL.Store = { available, set, get, del, saveSession, loadSession, clearSession, SESSION_KEY };
})();
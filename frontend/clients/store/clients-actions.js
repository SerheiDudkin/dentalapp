export const clientsLoaded = (clients) => ({
  type: 'CLIENTS_LOADED',
  clients,
});
export const clientsLoadFailed = (error) => ({
  type: 'CLIENTS_LOAD_FAILED',
  error,
});

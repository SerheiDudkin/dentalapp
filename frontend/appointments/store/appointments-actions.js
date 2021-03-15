export const appointmentsLoad = () => ({
  type: 'APPOINTMENTS_LOAD',
});

export const appointmentsLoaded = (items) => ({
  type: 'APPOINTMENTS_LOADED',
  items,
});

export const appointmentsLoadFailed = (error) => ({
  type: 'APPOINTMENTS_LOAD_FAILED',
  error,
});

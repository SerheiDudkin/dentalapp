export const clientLoad = (id) => ({
  type: 'CLIENT_LOAD',
  id,
});

export const clientLoaded = (client) => ({
  type: 'CLIENT_LOADED',
  client,
});

export const clientLoadFailed = (error) => ({
  type: 'CLIENT_LOAD_FAILED',
  error,
});

export const clientAppointmentsLoad = (clientId) => ({
  type: 'CLIENT_APPOINTMENTS_LOAD',
  clientId,
});

export const clientAppointmentsLoaded = (appointments) => ({
  type: 'CLIENT_APPOINTMENTS_LOADED',
  appointments,
});

export const clientAppointmentsLoadFailed = (error) => ({
  type: 'CLIENT_APPOINTMENTS_LOAD_FAILED',
  error,
});

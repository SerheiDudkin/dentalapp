export const clientAppointmentsInitialState = {
  items: [],
  error: null,
  isLoading: true,
};

export const clientInitialState = {
  item: null,
  error: null,
  isLoading: true,
  appointment: clientAppointmentsInitialState,
};

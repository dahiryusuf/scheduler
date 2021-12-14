
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
  if(filteredDays.length === 0){
    return []
  }
  const appointments = filteredDays[0].appointments.map(appointment => {  
    return state.appointments[appointment]
  });

 return appointments
}
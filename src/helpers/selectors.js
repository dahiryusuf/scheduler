
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

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
  if(filteredDays.length === 0){
    return []
  }
  const interviewers = filteredDays[0].interviewers.map(int => {  
    return state.interviewers[int]
  });

 return interviewers
}

export function getInterview(state, interview) {
  if(!interview){
    return null
  }
  
  let num = interview.interviewer;
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[num]
  }
  return interviewObj  

}
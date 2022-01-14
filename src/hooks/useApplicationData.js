import React, { useState, useEffect } from "react";
import axios from 'axios'



export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

const updateSpots = function (state, appointments, id) {
  const prevDay = state.appointments[id].interview
  const newDay = appointments[id].interview 
  const day = state.days.find(day => state.day === day.name)
  let spots = day.spots

  if(newDay && !prevDay) {
    spots--;
  }

  if(prevDay && !newDay) {
    spots++;
  }

const Days = state.days.map(days => {
  const finalDay = days.name === day.name ? {...days,spots } : days 
  return finalDay
});
return Days
};

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  

  return axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
  .then(() => {
    setState({
      ...state,
      appointments,
      days: updateSpots(state, appointments, id)
    });

  })
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  
  return axios.delete(`http://localhost:8001/api/appointments/${id}` )
  .then(() => {
    setState({
      ...state,
      appointment,
      days: updateSpots(state, appointments, id)
    });
    
  })
}

const setDay = day => setState({ ...state, day });
// const setDays = days => setState(prev => ({ ...prev, days }));

useEffect(() => {
  Promise.all([
    axios.get(' http://localhost:8001/api/days'),
    axios.get('http://localhost:8001/api/appointments'),
    axios.get('http://localhost:8001/api/interviewers')
  ]).then((all) => {
   
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    
  });
}, []);

return { state,
  setDay,
  bookInterview,
  cancelInterview}
}
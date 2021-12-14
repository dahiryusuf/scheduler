import React, { Fragment } from 'react'
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import "components/Appointment/styles.scss";


export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {props.interview ? <Show student = {props.student} interviewer = {props.interviewer}/> : <Empty/>}

    </article>

  );
}
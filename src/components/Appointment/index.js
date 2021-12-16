import React, { Fragment } from 'react'
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form"
import Status from './Status';
import Confirm from './Confirm';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
  
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    
  }
  function cancel() {
    transition(DELETE)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete = {() => transition(CONFIRM)}
        onEdit = {() => transition(EDIT)}
        id = {props.id}
    />
)}
       {mode === CREATE && <Form interviewers = {props.interviewers} onSave = {save} onCancel ={() => back(EMPTY)}  />}
       {mode === SAVING && <Status message = "SAVING"  />}
       {mode === DELETE && <Status message = "DELETE"  />}
       {mode === EDIT && <Form student = {props.interview.student} interviewer={props.interview.interviewer} interviewers = {props.interviewers} onSave = {save} onCancel ={() => back(EMPTY)}  />}
       {mode === CONFIRM && <Confirm onCancel={() => back(SHOW)} onConfirm = {cancel} />}
    </article>

  );
}
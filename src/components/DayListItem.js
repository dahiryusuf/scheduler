import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";



export default function DayListItem(props) {
  const formatSpots = () => {
    
    if(!props.spots){
      return `no spots remaining`
    }
    if(props.spots === 1){
      return `1 spot remaining`
    }
    return `${props.spots} spots remaining`;
    }
  const dayClass = classNames('day-list__item', {
    '--full': !props.spots,
    '--selected': props.selected
  });
  return (
    <li className = {dayClass} data-testid="day" onClick={() =>  props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
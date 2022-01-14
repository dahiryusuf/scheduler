import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(modes,replace = false) {
    let mod = [...history]
    if(replace){
      mod.pop();
      setHistory(() => [...mod, modes])
    }else{
   setHistory(prev => ([...prev, modes]))}
    setMode(modes)
  }
  function back() {
    let History = [...history]
    if (history.length <= 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      History.pop()
      setHistory(History);
    }

  }

  return { mode, transition, back };
}

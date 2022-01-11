import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(modes,replace = false) {
    let mod = [...history]
    if(replace){
      mod.pop();
      setHistory((prev) => [...mod, modes])
    }else{
   setHistory(prev => ([...mod, modes]))}
    setMode(modes)

  }
  function back() {
    let History = [...history]
    if (history.length <= 1) {
      setMode(initial);
    } else {
      History.pop()
      setMode(History[History.length - 1]);
      setHistory(History);
    }

  }

  return { mode, transition, back };
}

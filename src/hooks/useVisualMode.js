import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(modes,replace) {
    replace ? setHistory([...history, modes]) : setHistory([...history, mode]);
    setMode(modes)
  }
  function back() {
    let History = [...history]
    if(mode === history[history.length-1] && mode !== initial){
      History.pop();
    }
    
    setMode(History[History.length-1])
}

  return { mode, transition, back };
}

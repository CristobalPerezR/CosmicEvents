import { useEffect, useState } from "react";

import "./loadingfallback.css"
import nebulosa from "./assets/Nebulosa_de_Orión_desde_un_telescopio_de_relación_focal_corta.jpg"
import Lupa from "./assets/lupa.svg?react"

const Loading_Fallback = () => {
  const [dots, SetDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      SetDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fall-container">
      <div> 
        <img className="nebulosa" src={nebulosa}/>
        <Lupa className="lupa"/>
      </div>

      <div>Explorando el cosmos{dots}</div>
    </div>
  );
};

export default Loading_Fallback;
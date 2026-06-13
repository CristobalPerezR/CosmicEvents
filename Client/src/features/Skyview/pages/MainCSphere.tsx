import { useState } from "react";
import UserHeader from "../../Shared/userHeader/UserHeader";
import "./maincsphere.css"

import placeholder from "../assets/placeholder.jpg"

const CelestialSphere = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [text, setText] =useState("Hide ▲")

  const Change_State = () =>{
    if (text == "Hide ▲"){
      setText("Show ▼")
      setShowHeader(false)
    }

    if (text == "Show ▼"){
      setText("Hide ▲")
      setShowHeader(true)
    }
  }

  return(
      <UserHeader showHeader={showHeader}>
        <div className="Container-CS">
          <div className={`Showing ${showHeader ? "show" : "hidden"}`}>
            <span onClick={Change_State}>{text}</span>
          </div>

          {/* REAL BODY */}
          <div className="APP-CS">
            <img src={placeholder}/>
          </div>
        </div>
      </UserHeader>
  );
};

export default CelestialSphere;
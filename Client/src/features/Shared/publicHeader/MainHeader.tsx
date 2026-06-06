import { Link } from "react-router-dom";
import "./mainheader.css"

import saturnicon from "/saturnicon2.png";

interface Headerprops {
    children: React.ReactNode;
}

const inlineStyle = {
    padding: 5
}

const MainHeader = ( { children }: Headerprops ) => {
  return (
    <>  
        <header className="MainHeader-nav-bar">
            <nav className="MainHeader-container">

                <div className="MainHeader-title-container">
                    <Link className="MainHeader-title" to="/" style={inlineStyle}>
                        <img className="MainHeader-title-icon" src={saturnicon}/>
                    </Link>
                    <Link className="MainHeader-title" to="/">
                        <h2>Cosmic Events</h2>
                    </Link>
                </div>
                
                <div style={{alignSelf: 'right'}}>
                    <Link className="MainHeader-links" to='/login' style={inlineStyle}>Login</Link>
                    <Link className="MainHeader-links" to='/register' style={inlineStyle}>Register</Link>
                </div>

            </nav>
        </header>

        <main>{ children }</main>
    </>
  );
};

export default MainHeader;
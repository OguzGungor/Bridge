import React from "react";
import { Component } from "react";
import DesktopBreakpoint from "./desktop";
import PhoneBreakpoint from "./phone";


class App1 extends React.Component {
 render() {
 return (
 <div>
    <h2>My Breakpoints!</h2>
    
        <DesktopBreakpoint>
            <h3>DesktopBreakpoint!</h3>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <h3>PhoneBreakpoint</h3>
        </PhoneBreakpoint>
    </div>
 );
 }
}

export default App1;
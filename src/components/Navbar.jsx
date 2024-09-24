import React from "react";

export default function Navbar() {

    return(
        <nav
        className="
        fixed top-0 w-full z-50 text-white
        bg-indigo-950 h-[40px]">
            <div
            className="p-2 flex justify-between items-center">
                <div className="border"> Back</div>
                <div className="border">challenge</div>
                <div className="border">user info</div>
            </div>
        </nav>
    )


}
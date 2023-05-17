import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function PageNotFound () {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/")
        }, 3000);
    }, [])
    return (
        <div className='showOnError'>
          <p>Page not found.</p>
          <br />
          <Link to="/" reloadDocument>Start a new Game!</Link><br />
        </div>
    )
}

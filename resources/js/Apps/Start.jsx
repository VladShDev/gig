import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Login from "@/Apps/Start/Page/Auth/Login";
import Signup from "@/Apps/Start/Page/Signup";

export default function (props) {
    return <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>
    </>;
}
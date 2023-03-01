import React from 'react';
import ToolbarButton from "@/Components/DataGrid/Toolbar/Button";


function  Icon (){
    return <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_59_277)">
            <path d="M5.80762 18.7686H2.05762V6.76855H23.0576V18.7686H19.3076M19.3076 6.76855V1.51855H5.80762V6.76855M17.0576 10.5186H19.3076M5.80762 14.2686V22.5186H19.3076V14.2686H5.80762Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_59_277">
                <rect width="24" height="24" fill="white" transform="translate(0.557617 0.0185547)"/>
            </clipPath>
        </defs>
    </svg>
}

export default function (props) {
    const {} = props;
    return <>
        <ToolbarButton  icon={<Icon/>} onClick={() => {
            alert('PRINT here ');
        }}/>
    </>
}
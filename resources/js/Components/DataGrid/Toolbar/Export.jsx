import React from 'react';
import ToolbarButton from "@/Components/DataGrid/Toolbar/Button";


function  Icon (){
    return <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.4374 18.9815L18.2956 17.8397L16.2075 19.9279V13.3291H14.5925V19.9279L12.5043 17.8397L11.3625 18.9815L15.4 23.0189L19.4374 18.9815Z" fill="black"/>
        <path d="M9.74746 21.4041H1.67259V2.02443H8.13248V6.86935C8.13376 7.29727 8.30432 7.70731 8.60691 8.0099C8.9095 8.31249 9.31953 8.48304 9.74746 8.48432H14.5924V10.9068H16.2074V6.86935C16.2102 6.76323 16.19 6.65775 16.1482 6.56017C16.1064 6.46259 16.0439 6.37523 15.9651 6.30411L10.3127 0.6517C10.2416 0.572845 10.1543 0.51035 10.0567 0.468528C9.95909 0.426705 9.85359 0.406551 9.74746 0.409454H1.67259C1.24467 0.410732 0.834633 0.581291 0.532044 0.883881C0.229454 1.18647 0.0588952 1.5965 0.0576172 2.02443V21.4041C0.0588952 21.832 0.229454 22.2421 0.532044 22.5447C0.834633 22.8472 1.24467 23.0178 1.67259 23.0191H9.74746V21.4041ZM9.74746 2.34742L14.2694 6.86935H9.74746V2.34742Z" fill="black"/>
    </svg>

}

export default function (props) {
    const {} = props;
    return <>
        <ToolbarButton  icon={<Icon/>} onClick={() => {
            alert('Export here ');
        }}/>
    </>
}
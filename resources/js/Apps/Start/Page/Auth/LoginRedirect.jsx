import React from 'react';
import Modal from "@/Components/Modals";
import Loader from "@/Components/Loader";


export default function (props) {



    setTimeout(()=>{
       window.location = props.url;
    },1000);
    return <>
       <Modal effect={false} type={'right'}>
           <h1>Hello</h1>
           <p>You will be redirecting in one moment...</p>
           <Loader/>

       </Modal>
    </>;
}
import React, {useState} from 'react';
import Modal from "@/Components/Modals";
import ToolbarButton from "@/Components/DataGrid/Toolbar/Button";
import Button from "@/Components/Button";


export function Icon() {
    return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.48438 19.6401V18.0776H15.7344V19.6401H9.48438ZM6.35938 11.8276H18.8594V13.3901H6.35938V11.8276ZM21.9844 5.57764V7.14014H3.23438V5.57764H21.9844Z"
            fill="black"/>
    </svg>

}

export default function (props) {
    const {} = props;
    const [show, setShow] = useState(false);
    return <>
        <ToolbarButton title={'Filters'} icon={<Icon/>} onClick={() => {
            setShow(true)
        }}/>
        {show ?
            <Modal effect={false} type={'center'} onClose={() => setShow(false)} buttons={[<Button>Apply</Button>]}>

                {props.options.map(sorter => {
                    return <input type={'radio'}>{sorter.name}</input>
                })}

            </Modal> : null}
    </>
}
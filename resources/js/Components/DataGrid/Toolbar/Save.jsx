import React, {useState} from 'react';
import ToolbarButton from "@/Components/DataGrid/Toolbar/Button";
import Modal from "@/Components/Modals";
import Input from "@/Components/Input";
import Button from "@/Components/Button";


function Icon() {
    return <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19.9375 20.4092H17.9375V17.4092H14.9375V15.4092H17.9375V12.4092H19.9375V15.4092H22.9375V17.4092H19.9375V20.4092ZM12.9375 17.4092H2.9375V15.4092H12.9375V17.4092ZM15.9375 13.4092H2.9375V11.4092H15.9375V13.4092ZM15.9375 9.40918H2.9375V7.40918H15.9375V9.40918Z"
            fill="black"/>
    </svg>

}

export default function (props) {
    const {} = props;

    const [show, setShow] = useState(false);
    const [name, setName] = useState(null);

    return <>
        <ToolbarButton icon={<Icon/>} onClick={() => {
            setShow(true);
        }}/>
        {show ? <Modal
            buttons={[<Button onClick={() => {
                props.onSave(name);
                setShow(false);
            }}>Apply</Button>]}
            onClose={() => {
                setShow(false);
            }}
            title={'Save grid as new tab '}>

            <Input handleChange={e => {
                console.log('asdasdasd');
                setName(e.target.value);
            }} placeholder={'Name of Tab'}/>


        </Modal> : null}
    </>
}
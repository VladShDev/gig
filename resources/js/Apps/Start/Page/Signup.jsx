import React, {useState} from 'react';
import {Wizard, Step} from "@/Components/Wizard";
import Modal from "@/Components/Modals";


function Test(props) {

    const [data,setData] = useState(null);

    return <Step {...props} back={false} skip={false} onNext={() => {
        alert(data);
        return true;
    }}>
        <form>
            <label>asdasdads {data}</label>
            <input onKeyUp={e=>setData(e.target.value)} type={'text'}/>
        </form>
    </Step>
}


export default function (props) {
    return <Modal effect={false} onClose={() => {
            alert('err')
        }} type={'right'}>
            <Wizard>
                <Test />
                <Step skip={true} back={false}> This is step 2</Step>
                <Step skip={true} back={false}> This is step 3</Step>
                <Step skip={true} back={true}> This is step 4</Step>
            </Wizard>
        </Modal>

}
import React, {useEffect} from 'react';
import Button from "@/Components/Button";

export default function Modal(props) {
    const {effect = true, type = 'center', onClose, title, buttons} = props;

    let _classes = ["modal"];
    if (effect) _classes.push('has-effect');
    if (type) _classes.push(type);

    const google = <div>asdasdasd</div>;


    const escFunction = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    }

    useEffect(() => {
        // Your code here
        document.addEventListener("keydown", escFunction, false);
    }, []);

    // // componentWillUnmount
    // useEffect(() => {
    //     return () => {
    //         // Your code here
    //     }
    // }, []); s

    return <div className={_classes.join(' ')}>
        <div className="modal-overlay" onClick={(e) => {
            if (e.target.className == 'modal-overlay') {
                onClose()
            }
        }}>
            <div className={'modal-container'}>
                <div className={'modal-header'}>
                    {title ? <h1>{title}</h1> : null}
                    {onClose ? <a onClick={onClose} className={'modal-close'}>X</a> : null}
                </div>
                <div className="modal-content">
                    {props.children}
                </div>
                {buttons ?
                    <div className={'modal-footer'}>
                        {onClose ? <button onClick={onClose} className={'close'}>Close</button> : null}
                        {buttons.map((button, index) => {
                            return <span key={index}>{button}</span>
                        })}
                    </div>
                    : null}
            </div>
        </div>
    </div>
}

export function Confirm({onConfirm, onDecline, children}) {

    return <Modal title={'Confirmation'} buttons={[<Button onClick={() => {
        onConfirm()
    }}>Confirm</Button>]}
                  onClose={onDecline}>{children}</Modal>
}
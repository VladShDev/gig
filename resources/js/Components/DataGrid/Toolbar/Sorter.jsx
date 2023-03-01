import React, {useEffect, useState} from 'react';
import Modal from "@/Components/Modals";
import ToolbarButton from "@/Components/DataGrid/Toolbar/Button";
import Button from "@/Components/Button";
import {Col, Row} from "@/Components/Layout";


export function Icon() {
    return <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.02734 16.0186H5.02734V4.01855H8.02734L4.02734 0.0185547L0.0273438 4.01855H3.02734V16.0186ZM16.0273 12.0186H13.0273V0.0185547H11.0273V12.0186H8.02734L12.0273 16.0186L16.0273 12.0186Z"
            fill="black"/>
    </svg>
}

export function Arrow() {
    return <i>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.98 18H13.98V2H11.98V18H8.97998L12.98 22L16.98 18Z" fill="black"/>
        </svg>
    </i>
}


export default function (props) {

    const {onChange, field, dir, options} = props;
    const [show, setShow] = useState(false);

    const DIR_TYPES = {
        "date": {"asc": "Newest first", "desc": "Oldest first"},
        "text": {"asc": "A-Z", "desc": "Z-A"},
        "float": {"asc": "Low to High", "desc": "High to Low"},
        null: {"asc": "Ascending", "desc": "Descending"},
    };

    const [localDir, setLocalDir] = useState(dir);
    const [localField, setLocalField] = useState(field);


    useEffect(() => {
      setLocalField(field);
      setLocalDir(dir);
    }, [field,dir]); // 👈️ add props as dependencies


    const getDirName = (dir) => {

        let _option = options.find((option) => {
            return option.field == localField
        });

        if (!_option) {
            return DIR_TYPES[null][dir];
        }
        return DIR_TYPES[_option.type][dir];
    }

    return <>
        <ToolbarButton title={'Sorter'} icon={<Icon/>} onClick={() => {
            setShow(true)
        }}/>
        {show ?
            <Modal title={'Sort By:'} effect={false} type={'center'} onClose={() => {
                setShow(false);
                setLocalDir(dir);
                setLocalField(field)
            }}
                   buttons={[<Button onClick={() => {
                       onChange(localField, localDir);
                       setShow(false);
                   }}>Apply</Button>]}>
                <div className={'sorters-list'}>
                    <Row>
                        {options.map((sorter) => {

                            return <Col><label><input defaultChecked={localField == sorter.field}
                                                      onChange={() => setLocalField(sorter.field)}
                                                      name={'sorter'} value={sorter.field} type={'radio'}/>{sorter.name}
                            </label></Col>
                        })}
                    </Row>
                </div>

                <div className={'dirs-list'}>
                    <Col>

                        <Row center={true}>
                            <div onClick={e => {
                                setLocalDir('asc');
                            }} className={"flex center dir asc " + (localDir == 'asc' ? 'active' : null)}>
                                <Arrow/>{getDirName('asc')}</div>
                        </Row>

                        <Row center={true}>
                            <div onClick={e => {
                                setLocalDir('desc');
                            }} className={"flex center dir desc " + (localDir == 'desc' ? 'active' : null)}>
                                <Arrow/>{getDirName('desc')}</div>
                        </Row>

                    </Col>
                </div>
            </Modal> : null}
    </>
}
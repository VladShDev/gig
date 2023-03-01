import React, {useEffect, useState} from 'react';
import ToolbarButton from "@/Components/DataGrid/Toolbar/Button";
import Button from "@/Components/Button";
import {Col, Row} from "@/Components/Layout";
import Modal from "@/Components/Modals";
import {Arrow} from "@/Components/DataGrid/Toolbar/Sorter";
import {Block} from "@/Components/Tips";


export function Icon() {
    return <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.44312 4.85889H20.4431C20.9735 4.85889 21.4823 5.0696 21.8573 5.44467C22.2324 5.81975 22.4431 6.32845 22.4431 6.85889V18.8589C22.4431 19.3893 22.2324 19.898 21.8573 20.2731C21.4823 20.6482 20.9735 20.8589 20.4431 20.8589H4.44312C3.91268 20.8589 3.40397 20.6482 3.0289 20.2731C2.65383 19.898 2.44312 19.3893 2.44312 18.8589V6.85889C2.44312 6.32845 2.65383 5.81975 3.0289 5.44467C3.40397 5.0696 3.91268 4.85889 4.44312 4.85889ZM16.4431 6.85889V18.8589H20.4431V6.85889H16.4431ZM4.44312 6.85889V18.8589H8.44312V6.85889H4.44312ZM10.4431 6.85889V18.8589H14.4431V6.85889H10.4431Z"
            fill="black"/>
    </svg>
}

export default function (props) {

    const [show, setShow] = useState(false);

    const {columns, settings, onChange} = props;




    const prepareState = () => {
        let _mapIndex = Object.keys(props.settings);


        columns.map(column => {
            if (_mapIndex.indexOf(column.props.field) < 0) {
                _mapIndex.push(column.props.field);
            }
        });

        let _namedColumns = {};
        columns.map(column => {
            let isEnabled = false;
            if (settings[column.props.field] != undefined) {
                isEnabled = settings[column.props.field];
            } else {
                isEnabled = column.props.visible !== false;
            }
            _namedColumns[column.props.field] = {
                title: column.props.title,
                field: column.props.field,
                enabled: isEnabled
            };
        });


        let _list = [];
        _mapIndex.map(column => {
            if (_namedColumns[column]) {
                _list.push(_namedColumns[column]);
            }
        });
        return _list;

    }

    const submit = () => {
        let _settings = {};
        list.map(column => {
            _settings[column.field] = column.enabled;
        });

        onChange(_settings);
    }

    const [list, setList] = useState(prepareState());


    useEffect(() => {
        setList(prepareState())
    }, [props.settings]); // 👈️ add props as dependencies


    const changeStatusOfField = (field, status) => {
        let _list = [...list];
        _list.map(column => {
            if (column.field == field)
                column.enabled = status;
        });
        setList(_list);
    }

    return <>
        <ToolbarButton title={'Columns'} icon={<Icon/>} onClick={() => {
            setShow(true);
        }}/>

        {show ? <Modal title={'Select Columns:'}
                       effect={false}
                       type={'center'}
                       onClose={() => {
                           setShow(false);
                           setList(prepareState())
                       }}
                       buttons={[<Button onClick={() => {
                           submit();
                           setShow(false);
                       }}>Apply</Button>]}>

            <div>


                <div className={'columns-list'}>
                    <Block>Please select columns you want to see in the grid. You also can change position</Block>
                    <Row>
                        {list.map((column, index) => {
                            return <Col><label><input defaultChecked={column.enabled === true}
                                                      onChange={(e) => changeStatusOfField(column.field, e.target.checked)}
                                                      name={'column'} value={column.field}
                                                      type={'checkbox'}/>{column.title}
                            </label></Col>
                        })}
                    </Row>
                </div>

            </div>

        </Modal> : null
        }

    </>
}
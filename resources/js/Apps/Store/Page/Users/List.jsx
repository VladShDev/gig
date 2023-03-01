import React from 'react';
import {Head} from "@inertiajs/inertia-react";
import DataGridLoader from "@/Components/DataGridLoader";
import Column from "@/Components/DataGrid/Table/Columns/Column";
import {HashRouter, Link, Route, Routes, useMatch} from "react-router-dom";
import Modal from "@/Components/Modals";
import Button from "@/Components/DataGrid/Header/Button";


export default function (props) {

    const {edit} = props;
    return <>
        {edit ? <div>edit</div> : null}
        <Head title={'users'}/>
        <DataGridLoader
            buttons={[<Button title={'Add new User'}/>]}
            columns={[
                <Column field={'name'} title={'Name'} renderer={(item) => item.name}></Column>,
                <Column field={'email'} title={'Email'} renderer={(item) => item.email}></Column>,
                <Column field={'_stores'} title={'Stores'} renderer={(item) => item._stores}></Column>,
                <Column field={'role_name'} title={'Stores'} renderer={(item) => item.role_name}></Column>,
            ]}
            grid={'users'}
        />


    </>
}
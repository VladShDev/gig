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
        <Head title={'stores'}/>
        <DataGridLoader
            buttons={[<Button title={'Add new Store'}/>]}
            columns={[
            <Column field={'store_id'} title={'#'} renderer={(item) => {
                return <div>
                    <Link to={`/stores/id-${item.hash}`}>{item.id}</Link>
                </div>
            }}></Column>,
            <Column field={'column_2'} title={'Name'} renderer={(item) => {
                return <div> {item.name}</div>
            }}></Column>,
        ]}
                        grid={'stores'}
        />


    </>
}
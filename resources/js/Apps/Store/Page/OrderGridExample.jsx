import React from 'react';
import {Head} from "@inertiajs/inertia-react";
import DataGridLoader from "@/Components/DataGridLoader";
import Column from "@/Components/DataGrid/Table/Columns/Column";
import PlansSelector from "@/Components/PlansSelector/PlansSelector";
import Modal from "@/Components/Modals";

export default function (props) {
    const {} = props;
    return <>
        <Head title={'Settings'}/>
        <DataGridLoader columns={[
            <Column field={'id'} title={'#'} renderer={(item) => {
                return <div> {item.id}</div>
            }}></Column>,
            <Column field={'name'} title={'Name'} renderer={(item) => {
                return <div> <a href={''}>{item.name}</a></div>
            }}></Column>,
            <Column field={'title'}  title={'Description'} renderer={(item) => {
                return <div> {item.description}</div>
            }}></Column>
        ]}
        grid={'orders'}
        />


        <PlansSelector/>




    </>
}
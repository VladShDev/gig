import React from 'react';
import DataGridLoader from "@/Components/DataGridLoader";
import Column from "@/Components/DataGrid/Table/Columns/Column";


export default function Welcome(props) {
    return <div>
            <DataGridLoader columns={[
                <Column id={'first_name'} title={'First Name'} renderer={(item) => {
                    return <div> {item.first_name}</div>
                }}></Column>,
                <Column id={'first_name2'}  title={'First Name'} renderer={(item) => {
                    return <div> {item.first_name}</div>
                }}></Column>,
                <Column id={'last_name'}  visible={false} title={'First Name'} renderer={(item) => {
                    return <div> {item.first_name}</div>
                }}></Column>,
                <Column id={'last_name2'}  visible={false} title={'Last name'} renderer={(item) => {
                    return <div>{item.last_name} </div>
                }}></Column>
            ]}
            grid={'orders'}/>
    </div>
}
import React, {useState} from 'react';
import {Head} from "@inertiajs/inertia-react";
import DataGridLoader from "@/Components/DataGridLoader";
import Column from "@/Components/DataGrid/Table/Columns/Column";
import {HashRouter, Link, Route, Routes, useMatch} from "react-router-dom";
import Modal from "@/Components/Modals";
import Status from "@/Components/DataGrid/Renderer/Status";
import Tabs from "@/Components/Tabs";
import Tab from "@/Components/Tabs/Tab";
import Permissions from "@/Components/Acl/Permissions";
import Button from "@/Components/DataGrid/Header/Button";
import Input from "@/Components/Input";


export default function (props) {

    const {edit} = props;

    const [roleModal, showRoleModal] = useState(false);
    const [role, setRole] = useState({});


    return <>
        {edit ? <div>edit</div> : null}
        <Head title={'User Roles'}/>

        <DataGridLoader
            buttons={[
                <Button onClick={() => {
                    showRoleModal(true)
                }} title={'Create Role'}/>]}
            columns={[
                <Column field={'id'} title={'#'} renderer={(item) => {
                    return <div>
                        {item.id}
                    </div>
                }}></Column>,
                <Column field={'name'} title={'Name'} renderer={(item) => {
                    return <a href={'#'}>{item.name}</a>
                }}></Column>,
                <Column field={'active'} title={'Is Active'}
                        renderer={(item, field) => <Status item={item} field={field}/>}>
                </Column>,
                <Column field={'_users'} title={'Users'} renderer={(item) => {
                    return <div>{item._users}</div>
                }}></Column>
            ]} grid={'roles'}

        />

        {roleModal ? <Modal
            buttons={[
                <Button title={'Save'}/>
            ]}
            onClose={() => showRoleModal(false)}
            title={'Create New Role'} type={'center'}>
            <form>

                <Input type={'text'} label={'Enter Your name'} placeholder={'Enter Role Name'}/>

                <Input type={'select'} label={'Status'} options={{1: "Enabled", 0: "Disabled"}}/>

                <Tabs>
                    <Tab name={'Permissions'}>
                        <Permissions allowed={["/", "/users"]} denied={['/users/users/read']}
                                     onChange={(allowed, denied) => {
                                         console.log('permissions', allowed, denied)
                                     }}/>
                    </Tab>
                    <Tab name={'Users'}>2</Tab>
                    <Tab name={'this is second tabs'}>3</Tab>
                </Tabs>
            </form>
        </Modal> : null}


    </>
}
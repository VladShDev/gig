import React, {useEffect, useState} from 'react';
import Loader from "@/Components/Loader";
import {get} from "@/Utils/Ajax";
import {router} from "@/Utils/Routes";

export default function (props) {
    const {onChange} = props;

    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const [allowed, setAllowed] = useState(props.allowed);
    const [denied, setDenied] = useState(props.denied);

    const allow = (path) => {

        if (path == "/") {
            setAllowed(["/"]);
            setDenied([]);
            return false;
        }

        setAllowed([...allowed, path]);

        let index = denied.indexOf(path);
        if (index !== -1) {
            denied.splice(index, 1);
            setDenied([...denied]);
        }

        if (denied.length == 0 && allowed.indexOf('/') >= 0) {
            setAllowed(["/"]);
            setDenied([]);
            return false;
        }
    }

    useEffect(() => {
        onChange(allowed, denied);
    }, [allowed, denied])

    const deny = (path) => {
        if (path == "/") {
            setAllowed([]);
            setDenied([]);
            return false;
        }

        setDenied([...denied, path]);

        let index = allowed.indexOf(path);
        if (index !== -1) {
            allowed.splice(index, 1);
            setAllowed([...allowed]);
        }
    }

    const isAllowed = (path) => {
        // все что не разрешено  - запрещено
        // все что запрещено - не разрешено
        let isDenied = denied.filter((permission) => {
            return permission == path || path.indexOf(permission) == 0
        }).length > 0;

        let isAllowed = allowed.filter((permission) => {
            return permission == path || path.indexOf(permission) == 0 || permission == "/"
        }).length > 0;

        if (isDenied) return false;
        if (isAllowed) return true;
        return false;
    }

    function PermissionRecursive(permission) {
        let path = (permission.path ? permission.path : "") + "/" + permission.id;
        return <>
            <div className={'name'}><label><input onChange={event => {
                if (event.target.checked === true) {
                    allow(path);
                } else {
                    deny(path);
                }
            }} checked={isAllowed(path)} type={'checkbox'}/> {permission.name}</label></div>
            <div className={'tree'}>{permission.children.length > 0 ? permission.children.map((p, i) =>
                <PermissionRecursive
                    key={i} path={path} {...p}/>) : null}</div>
        </>
    }


    useEffect(() => {
        setLoading(true);
        get(router('acl.permissions')).then(r => {
            setPermissions(r);
            setLoading(false);
        });
    }, []);


    if (loading) return <Loader/>;

    return <>

        {/*
        <table className={'table'}>
            <thead>
            <tr>
                <th>Allowed</th>
                <th>Denied</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    {allowed.map((permission, i) => <div>{permission}</div>)}
                </td>
                <td>
                    {denied.map((permission, i) => <div>{permission}</div>)}
                </td>
            </tr>
            </tbody>
        </table>*/}
        <div className={'permissions-tree'}>{permissions.map((permission, i) => {
            return <PermissionRecursive key={i} {...permission}/>
        })}</div>
    </>;

}
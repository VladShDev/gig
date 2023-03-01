import React, {useState, useCallback, useRef} from 'react';

import {Head} from "@inertiajs/inertia-react";
import Builder from "@/Components/Settings/Builder";
import Button from "@/Components/Button";
import Loader from "@/Components/Loader";
import Save from "@/Components/Button/Save";
import {post} from "@/Utils/Ajax";
import {router} from "@/Utils/Routes";
import Error from "@/Components/Messages/Error";
import Success from "@/Components/Messages/Success";
import Info from "@/Components/Messages/Info";

export default function (props) {

    const {configuration} = props;
    const {id, name, children, type, component} = props.configuration;

    const [saving, setSaving] = useState(false);
    const [changed, setChanged] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const settings = useRef({});

    window.CACHED_SETTINGS = props.values;

    const onChange = useCallback((path, value) => {
        settings.current[path] = value;
        setChanged(true);
        setError(false);
        setSuccess(false);
        window.CACHED_SETTINGS = settings.current;
    }, [settings]);

    return <div>

        <h1>Settings / {name}</h1>
        <Head title={"Settings / " + name}/>

        <Error messages={error}/>
        <Success messages={success}/>

        <div className={'settings panel'}>
            <Builder onChange={onChange} configuration={configuration}/>
        </div>
        <br/>

        <Save
            saving={saving}
            disabled={changed === false}
            onClick={() => {
                setSuccess(false);
                setError(false);
                setSaving(true);
                post(router('settings.save'), settings.current).then(r => {
                    setSaving(false);
                    setChanged(false);
                    setSuccess("Settings was saved!");
                }).catch((error) => {
                    setError(error.message);
                });
            }}/>


    </div>

}
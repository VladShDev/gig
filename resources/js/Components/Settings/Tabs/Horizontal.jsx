import React from 'react';
import Tabs from "@/Components/Tabs";
import Builder from "@/Components/Settings/Builder";
import Button from "@/Components/Button";

export default function (props) {


    const {configuration} = props;

    const {} = props;
    return <>
        <Tabs type={'horizontal'}>
            {configuration.children.map(child => <Builder path={props.path} onChange={props.onChange}  name={child.name} configuration={child}/>)}
        </Tabs>
    </>
}
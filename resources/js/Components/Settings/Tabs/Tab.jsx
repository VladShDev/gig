import React from 'react';
import Tab from "@/Components/Tabs/Tab";
import Builder from "@/Components/Settings/Builder";

export default function (props) {

    return <Tab name={props.configuration.name}>
        {props.configuration.children.map(child => <Builder path={props.path} onChange={props.onChange} name={child.name} configuration={child}/>)}
    </Tab>
}
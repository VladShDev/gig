import React from 'react';
import Tab from "@/Components/Tabs/Tab";
import Builder from "@/Components/Settings/Builder";

export default function (props) {

    return <div className={'group'}>
        <div className={'name'}>{props.configuration.name}</div>
        <div className={'content'}>
            {props.configuration.children.map(child => <Builder path={props.path} onChange={props.onChange}
                                                                name={child.name} configuration={child}/>)}
        </div>
    </div>
}
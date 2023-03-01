import React from 'react';
import Button from "@/Components/Button";

export default function (props) {

    const {title} = props;
    return <Button onClick={props.onClick}>{title}</Button>
}
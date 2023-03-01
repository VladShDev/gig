import React, {useEffect, useState} from 'react';
import {get} from "@/Utils/Ajax";
import {default as GridFactory} from "@/Components/DataGrid/Factory";
import Loader from "@/Components/Loader";
import {router} from "@/Utils/Routes";

export default function (props) {

    let {grid, columns} = props;
    const [loading, setLoading] = useState(false);
    const [gridProps, setGridProps] = useState(null);

    useEffect(() => {
        setLoading(true);
        get(router('grid.load', {grid: grid}), {}).then(_gridResponse => {
            setLoading(false);
            /**
             * Transfer things from props
             */
            setGridProps({..._gridResponse, ...props});
        });
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Data Grid Component
    |--------------------------------------------------------------------------
    |
    | This Component can be used to load grid dynamically
    | or via predefined options
    |
    */
    if (loading === true) return <Loader/>
    if (gridProps) return <GridFactory {...gridProps}/>

    return <></>

}



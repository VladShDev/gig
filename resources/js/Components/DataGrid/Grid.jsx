import React, {useEffect, useState} from 'react';
import Table from "@/Components/DataGrid/Table";
import Loader from "@/Components/Loader";
import Actions from "@/Components/DataGrid/Actions";


function Icon() {
    return <i>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.7718 3.91561L11.8366 0.98039C11.7012 0.845002 11.5351 0.745717 11.3546 0.691562V0.642822H1.24563C0.926109 0.642822 0.667969 0.900962 0.667969 1.22048V14.5066C0.667969 14.8261 0.926109 15.0842 1.24563 15.0842H14.5317C14.8512 15.0842 15.1094 14.8261 15.1094 14.5066V4.73155C15.1094 4.42467 14.9884 4.13223 14.7718 3.91561ZM5.57805 1.94255H10.1993V3.81993H5.57805V1.94255ZM13.8096 13.7845H1.9677V1.94255H4.42273V4.39759C4.42273 4.7171 4.68087 4.97524 5.00039 4.97524H10.777C11.0965 4.97524 11.3546 4.7171 11.3546 4.39759V2.33608L13.8096 4.79112V13.7845ZM7.88867 6.5999C6.45356 6.5999 5.28922 7.76424 5.28922 9.19936C5.28922 10.6345 6.45356 11.7988 7.88867 11.7988C9.32379 11.7988 10.4881 10.6345 10.4881 9.19936C10.4881 7.76424 9.32379 6.5999 7.88867 6.5999ZM7.88867 10.6435C7.09078 10.6435 6.44453 9.99724 6.44453 9.19936C6.44453 8.40147 7.09078 7.75522 7.88867 7.75522C8.68656 7.75522 9.33281 8.40147 9.33281 9.19936C9.33281 9.99724 8.68656 10.6435 7.88867 10.6435Z"
                fill="black"/>
        </svg>
    </i>
}

export default function (props) {


    const {title, tabs, buttons, toolbar, items, columns, pager, loading, saving} = props;


    return <div className={'data-grid ' + (loading ? "data-loading" : '')}>


        <div className="data-grid-header">
            {title ? <div className={'data-grid-title'}><h1>{title}</h1></div> : null}
            {buttons ? <div className={'buttons'}>
                {buttons.map(button => <div>{button}</div>)}
            </div> : null}
        </div>
        <div className="data-grid-table-wrapper">
            {saving ? <div className={'data-grid-saving'}>
                <div className={'indicator'}><Icon/> Saving....</div>
            </div> : null}
            {loading ? <div className={'grid-items-loader'}>
                <Loader/>
            </div>: null}
            {tabs ? <>{tabs}</> : null}
            {toolbar ? <>{toolbar}</> : null}

            {props.checked && props.checked.length > 0 ? <Actions cancel={props.uncheck} ids={props.checked} actions={props.actions}/> : null}

            <Table items={items} columns={columns}/>
        </div>
        {pager ? pager : null}
    </div>
}
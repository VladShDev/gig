import React from 'react';
import Row from "@/Components/DataGrid/Table/Row";

export default function (props) {
    const {items, columns} = props;
    return <table className={'data-grid-table table'}>
        <thead>
        <tr>
            {columns.map(column=>column)}
        </tr>
        </thead>
        <tbody>
        {items.length ?
            items.map(item => {
                    return <Row item={item} columns={columns}/>
                })
            :
            <td className={'no-rows'} colspan={columns.length}>
                <span>No Records Found</span>
            </td>
        }
        </tbody>
    </table>;

}
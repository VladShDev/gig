import React from 'react';

export default function (props) {

    const {columns, item} = props;
    return <tr className={'tr'}>
        {columns.map(column => {
            //if (column.props.visible !== false) {
            return <td className={'td'}>{column.props.renderer(item, column.props.field)}</td>
            //}
        })}
    </tr>
}
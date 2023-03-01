import React from 'react';

import Search from "@/Components/DataGrid/Toolbar/Search";
import Tags from "@/Components/DataGrid/Toolbar/Tags";
import Filters from "@/Components/DataGrid/Toolbar/Filters";
import Sorter from "@/Components/DataGrid/Toolbar/Sorter";
import Columns from "@/Components/DataGrid/Toolbar/Columns";
import Export from "@/Components/DataGrid/Toolbar/Export";
import Print from "@/Components/DataGrid/Toolbar/Print";
import Save from "@/Components/DataGrid/Toolbar/Save";

export {Search, Tags, Filters, Sorter, Columns, Export, Print, Save}

export function Toolbar (props) {
    return <div className={'data-grid-toolbar'}>
        {props.children}
    </div>
}
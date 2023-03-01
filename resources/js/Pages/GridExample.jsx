import React from 'react';
import Grid from "@/Components/DataGrid/Grid";
import Tabs from "@/Components/DataGrid/Tabs";
import Tab from "@/Components/DataGrid/Tabs/Tab";
import Button from "@/Components/DataGrid/Header/Button";
import {Tags, Toolbar, Search, Filters, Sorter, Columns, Export, Print, Save} from "@/Components/DataGrid/Toolbar";
import Column from "@/Components/DataGrid/Table/Columns/Column";
import Pager from "@/Components/DataGrid/Pager";


export default function Welcome(props) {
    return <div>

        <Grid
            title={"This is is data grid sample"}
            buttons={[
                <Button title={'Add new record'}/>,
                <Button title={'Add new record2'}/>
            ]}
            tabs={
                <Tabs>
                    <Tab canDelete={false} title={"tab_1"}/>
                    <Tab canDelete={true} title={"tab_2"}/>
                    <Tab canDelete={true} title={"tab_3"}/>
                </Tabs>
            }
            columns={[
                <Column title={'Date'} renderer={(item)=>{return <div>APP-DEBUG {item.a}</div>}}></Column>,
                <Column title={'Time'} renderer={(item)=>{return <div>ROW #2 {item.a} </div>}}></Column>
            ]}
            toolbar={<Toolbar>
                <Search title={"Search by Orders"} />
                <Tags />
                <Separator />
                <Filters/>
                <Sorter/>
                <Columns/>
                <Separator />
                <Export/>
                <Print/>
                <Save/>
            </Toolbar>}
            items={[{a: 1}, {a: 2}, {a: 3}]}
            pager={<Pager perPage={20} total={600} page={13} limiters={[20,100,'all']}/>}
        />
    </div>
}
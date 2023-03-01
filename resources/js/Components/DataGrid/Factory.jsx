import React, {useEffect, useState} from 'react';
import Grid from "@/Components/DataGrid/Grid";
import Tabs from "@/Components/DataGrid/Tabs";
import Tab from "@/Components/DataGrid/Tabs/Tab";
import Button from "@/Components/DataGrid/Header/Button";
import {
    Tags,
    Toolbar,
    Search,
    Filters,
    Sorter,
    Columns,
    Export,
    Print,
    Save
} from "@/Components/DataGrid/Toolbar";
import Pager from "@/Components/DataGrid/Pager";
import {DELETE, get, post, request} from "@/Utils/Ajax";
import Section from "@/Components/DataGrid/Toolbar/Section";
import {router} from "@/Utils/Routes";
import Column from "@/Components/DataGrid/Table/Columns/Column";


export default function (props) {
    const {title, columns, grid} = props;

    const [request, setRequest] = useState(props.request);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(props.data);
    const [saving, setSaving] = useState(false);
    const [tabs, setTabs] = useState(props.tabs);
    const [options, setOptions] = useState(props.options);

    const [checked, setChecked] = useState([]);

    /**
     * Read Only options to configure
     * Data Grid
     */
    const {canSave, canExport, canPrint, canManageTags, limiters} = props.options;

    const [columnsSettings, setColumnsSettings] = useState(options.columns ? options.columns : []);


    const canManageColumns = () => {
        return options.canManageColumns && options.columns;
    }

    const canSort = () => {
        return options.sorters && options.sorters.length > 0;
    }


    const canFilter = () => {
        return options.filters && options.filters.length > 0;
    }

    const canSearch = () => {
        return false;
    }

    const canTags = () => {
        return canManageTags;
    }

    const hasToolbar = () => {
        return canTags() || canFilter() || canSort() || canSearch() || canSave || canExport || canManageColumns()
    }

    const changeSelected = (id, status) => {

        let _checked = checked;
        let _index = _checked.indexOf(id);
        if (_index >= 0) {
            _checked.splice(_index, 1);
        }

        if (status === true) {
            _checked.push(id);
        }
        setChecked([..._checked]);
    }

    useEffect(() => {
        console.log('checked', checked);
    }, [checked]);

    /**
     * Saving data grid to backend
     */
    useEffect(() => {
        if (!saving) return false;

        let _payload = {
            columns: columnsSettings,
            filters: request.filters,
            per_page: request.per_page,
            order: request.order,
            tab: data.tab,
        };


        post(router('grid.save', {grid: grid}), _payload).then(_gridResponse => {
            setSaving(false);
            setOptions(_gridResponse.options);
            setTabs(_gridResponse.tabs);
            setRequest(_gridResponse.request);
        });


    }, [saving]);

    /**
     * Load data from the server
     */
    useEffect(() => {
        if (!loading) return false;
        post(router('grid.load', {grid: props.grid}), request).then(response => {
            setLoading(false);
            setData(response.data);
            setColumnsSettings(response.options.columns);
            setRequest(response.request);
            setOptions(response.options);
        });
    }, [loading]);


    let _mapIndex = Object.keys(columnsSettings);

    columns.map(column => {
        if (_mapIndex.indexOf(column.props.field) < 0) {
            _mapIndex.push(column.props.field);
        }
    });

    let _namedColumns = {};
    columns.map(column => {
        let _shouldBeAdded = false;
        if (columnsSettings[column.props.field] != undefined) {
            _shouldBeAdded = columnsSettings[column.props.field];
        } else {
            _shouldBeAdded = column.props.visible !== false;
        }
        if (_shouldBeAdded) {
            _namedColumns[column.props.field] = column;
        }
    });


    /**
     *  checkboxes as first column
     */
    let visibleColumns = [];

    if (options.actions && options.actions.length > 0) {
        visibleColumns.push(
            <Column field={'checkbox'} title={<input type={'checkbox'}/>} renderer={(item) => {
                return <div><input checked={checked.indexOf(item.id) >= 0}
                                   onChange={(e) => changeSelected(item.id, e.target.checked)} type={'checkbox'}/>
                </div>
            }}></Column>
        );
    }


    _mapIndex.map(column => {
        if (_namedColumns[column]) {
            visibleColumns.push(_namedColumns[column]);
        }
    });

    const _load = async () => {

    }

    const load = () => {
        // _load().then(r => {
        // });
        setLoading(true);
    }

    const setPage = (page) => {
        setRequest({...request, page: page});
        load();
    }

    const setPerPage = (per_page) => {
        setRequest({...request, ...{page: 1, per_page: per_page}});
        saveGrid();
        load();
    }

    const setTab = (tab) => {
        setData({...data, tab: tab});
        let neededTab = tabs.find((_tab) => {
            return tab == _tab.id;
        });
        setRequest({...neededTab.request, page: 1, tab: tab});
        load();
    }


    const deleteTab = (tab) => {
        DELETE(router('grid.delete', {grid: grid, tab: tab})).then(_gridResponse => {
            setOptions(_gridResponse.options);
            setTabs(_gridResponse.tabs);
            setTab(tabs[0].id);
        });
    }


    const setOrder = (field, dir) => {
        setRequest({...request, ...{order: {field: field, dir: dir}}});
        load();
        saveGrid();
    }

    const saveGrid = () => {
        setSaving(true);
    }

    return <div>

        <Grid
            title={title}
            loading={loading}
            saving={saving}
            checked={checked}
            actions={options.actions}
            uncheck={() => {
                setChecked([]);
            }}
            buttons={props.buttons}
            tabs={
                (tabs && tabs.length) > 0 ? <Tabs>
                    {tabs.map(tab => {
                        let _props = {...tab};
                        _props.setTab = setTab;
                        _props.deleteTab = deleteTab;
                        _props.active = data.tab.id == tab.id;
                        return <Tab {..._props}/>
                    })}
                </Tabs> : null
            }
            columns={visibleColumns}
            toolbar={hasToolbar() ? <Toolbar {...props}>

                {canTags() || canSearch() ?
                    <Section>
                        {options.search ? <Search {...options.search}/> : null}
                        {canTags() ? <Tags/> : null}
                    </Section>
                    : null}


                {canFilter() || canSort() || canManageColumns() ?
                    <Section>
                        {canFilter() ? <Filters/> : null}
                        {canSort() ? <Sorter
                            field={request.order ? request.order.field : null}
                            dir={request.order ? request.order.dir : null}
                            onChange={(field, dir) => {
                                setOrder(field, dir);
                            }} options={options.sorters}/> : null}
                        {canManageColumns() ? <Columns onChange={(settings) => {
                            setColumnsSettings(settings);
                            saveGrid();
                        }} settings={columnsSettings} columns={columns}/> : null}
                    </Section>
                    : null}


                {canPrint || canExport || canSave ?
                    <Section>
                        {canPrint ? <Print/> : null}
                        {canExport ? <Export/> : null}
                        {canSave ? <Save onSave={(name) => {
                            setData({
                                ...data,
                                tab: {id: grid + "-" + parseInt(new Date().getTime() / 1000), name: name}
                            });
                            saveGrid();
                        }}/> : null}
                    </Section>
                    : null}
            </Toolbar> : null}
            items={data.items}
            pager={<Pager setPerPage={setPerPage} setPage={setPage} perPage={request.per_page} total={data.total}
                          page={request.page} limiters={options.limiters}/>}
        />
    </div>
}
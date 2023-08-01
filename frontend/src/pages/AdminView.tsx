import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ExpandableSidebar from '~/components/ExpandableSidebar';

interface Data {
    make: string;
    model: string;
    price: number;
}

type ColumnDef = {
    field: keyof Data;
    filter: string;
    sortable?: boolean;
    resizable?: boolean;
    floatingFilter?: boolean;
}[];

const AdminView = () => {
    const [rowData] = useState<Data[]>([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);

    const [columnDefs] = useState<ColumnDef>([
        {
            field: 'make',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'model',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'price',
            filter: 'agTextColumnFilter',
        },
    ]);

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
        floatingFilter: true,
    };

    const sideBarLinks = [
        'Pending Registration',
        'Pending Verification',
        'Registered Users',
    ];

    return (
        <ExpandableSidebar links={sideBarLinks}>
            {(currentView: string) => {
                return (
                    <div className='grow grid p-2 md:px-12 grid-rows-[min-content_1fr] gap-4'>
                        <h1 className='text-2xl font-bold'>{currentView}</h1>
                        <div className='ag-theme-alpine-dark'>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                // sideBar={'filters'}
                            ></AgGridReact>
                        </div>
                    </div>
                );
            }}
        </ExpandableSidebar>
    );
};

export default AdminView;

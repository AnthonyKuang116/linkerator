import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const CreateList = ({links}) => {
    const columns = [
        {field: "id", headerName: "ID", width: 110},
        {field: "link", headerName: "Link", width: 200},
        {field: "clickCount", headerName: "Click Count", width: 150},
        {field: "comment", headerName: "Comment", width: 150},
        {field: "tagId", headerName: "Tags", width: 150},
        {field: "dateShared", headerName: "Date Shared", width: 200}
    ];
    console.log(links)

    const rows = links;


    return (
        <div className="mainList" style={{width: 1000}}>
            <DataGrid rows={rows} columns={columns}/> 
        </div>
    )
}

export default CreateList;
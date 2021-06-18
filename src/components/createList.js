import React, { useState, useEffect } from "react";

import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";

import { deleteLink } from '../api';

const CreateList = ({ links }) => {
    const [select, setSelect] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 110, hide: true },
        { field: "link", headerName: "Link", width: 200 },
        { field: "clickCount", headerName: "Click Count", width: 150 },
        { field: "comment", headerName: "Comment", width: 150 },
        { field: "tagId", headerName: "Tags", width: 150 },
        { field: "dateShared", headerName: "Date Shared", width: 200 }
    ];
    console.log(links)

    const rows = links;

    useEffect(() => {
        console.log(select)
    }, [select])

    const deleteHandle = async () => {
        try {
            deleteLink(select)
        } catch (error) {
            console.error("Could not delete link data", error);
        }
    }

    const handleGrabId = async (event) => {
        try {
            setSelect(event.selectionModel);
        } catch (error) {
            console.error("Could not grab ID", error);
            throw error;
        }
    }

    return (
        <div className="mainList" style={{ width: 1000 }}>
            <DataGrid rows={rows} columns={columns} onSelectionModelChange={handleGrabId} />
            <Button variant="contained"
                color="primary"
                style={{
                    height: "50px",
                    margin: "10px 0",
                    width: "50%",
                    alignSelf: "center",
                }}
                onClick={deleteHandle}>Delete</Button>
        </div>
    )
}

export default CreateList;
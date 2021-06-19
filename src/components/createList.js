import React, { useState, useEffect } from "react";

import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";

import { deleteLink, goToLink, linkCount } from '../api';

const CreateList = ({ links }) => {
    const [select, setSelect] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 110, hide: true },
        { field: "link", headerName: "Link", width: 200 },
        { field: "clickCount", headerName: "Click Count", width: 150 },
        { field: "comment", headerName: "Comment", width: 275 },
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
            await deleteLink(select)
        } catch (error) {
            console.error("Could not delete link data", error);
            throw error;
        }
    }

    const goToSiteHandle = async () => {
        try {

            const link = await goToLink(select);
            console.log(link)
            const url = link.data.link.link; //pulls the URL off the object
            if (url.startsWith('https://') || url.startsWith('http://')){
                window.open(url); //opens the clicked button/link in new window
            }
            const newLink = 'https://' + url
            window.open(newLink)
            console.log(newLink)

            await linkCount(select); //updates count when site is vistied

        } catch (error) {
            console.error("Could not go to this site!", error);
        }
    }

    const handleGrabId = async (event) => {
        try {
            await setSelect(event.selectionModel);
        } catch (error) {
            console.error("Could not grab ID", error);
            throw error;
        }
    }

    return (
        <div className="mainList" style={{ width: "100%", height: 455, gridColumn: "2/10", gridRow: "2/3", marginTop: 20}}>
            <DataGrid rows={rows} columns={columns} onSelectionModelChange={handleGrabId} pageSize={7} sortModel={[{field: 'clickCount', sort: 'desc'}]}/>
            <Button variant="contained"
                color="primary"
                style={{
                    height: "50px",
                    margin: "10px 0",
                    width: "50%",
                    alignSelf: "center",
                }}
                onClick={goToSiteHandle}>Go to Site</Button>
            <Button variant="contained"
                color="secondary"
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
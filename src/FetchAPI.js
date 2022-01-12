import React from "react";

export function FetchAPI() {

    const apiGet = () => {
        fetch("http://ctp-zip-api.herokuapp.com/zip/10016")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });
    }

    return (
        <div>
            MY API <br />
            <button onClick={apiGet}>Fetch API</button>
            <br />
        </div>
    )
}
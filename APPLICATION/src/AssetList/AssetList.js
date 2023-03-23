import React from 'react';
import "./AssetList.scss"
import "./AssetListElement"
import AssetListElement from "./AssetListElement";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

const AssetList = ({tableData}) => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();

    const navToItem=(idShort, idEncoded)=>{
        navigate(`/asset/${idShort}?${query.toString()}`);
    }

    return (
        <ListGroup className="d-flex p-5 pt-0">
        {tableData.map((item, index) => (
            <AssetListElement key={index} assetData={item} onClick={navToItem}></AssetListElement>))}
        </ListGroup>)
}
export default AssetList;

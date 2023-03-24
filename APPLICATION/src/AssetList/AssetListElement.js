import "./AssetListElement.scss"
import {Col, ListGroup, Row} from "react-bootstrap";

function AssetListElement({assetData, onClick}) {

    const handleClick=(event)=>{
        event.stopPropagation()
        event.preventDefault()
        onClick(assetData.idShort, assetData.idEncoded);
    };

    return(
        <ListGroup.Item onClick={handleClick} action className="border-top mt-2 shadow-sm">
            <Row className={"assetListElementRow"}>
                <Col md={2} className={"text-center m-auto"}>
                    {assetData.productImages&&assetData.productImages>0?
                        <img src={assetData.productImages[0]} alt={"Product Image"} className={"img-preview"}/>:
                        ""
                    }
                </Col>
                <Col className={"d-flex align-items-center"}>
                    <span className={"d-flex align-items-center"}>{assetData.idShort}</span>
                </Col>
            </Row>
        </ListGroup.Item>
        )
}
export default AssetListElement;
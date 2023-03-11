import "./AssetListElement.scss"
import {Col, ListGroup, Row} from "react-bootstrap";

function AssetListElement({assetData, onClick}) {

    const handleClick=(event)=>{
        event.stopPropagation()
        event.preventDefault()
        onClick(assetData.idShort, assetData.idEncoded);
    };

    return(
        <ListGroup.Item onClick={handleClick} action variant={"dark"}>

            <Row>
                <Col md={2} className={"text-center"}>
                    <img src={assetData.productImages?assetData.productImages[0]:""} alt={"Product Image"} className={"img-preview"}/>
                </Col>
                <Col className={"d-flex align-items-center"}>
                    <span className={"d-flex align-items-center"}>{assetData.idShort}</span>
                </Col>
            </Row>
        </ListGroup.Item>
        )
}
export default AssetListElement;
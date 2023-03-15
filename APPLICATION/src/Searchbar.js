import {Button, Form, InputGroup} from "react-bootstrap";
import "./Searchbar.scss"

function Searchbar({onChange, onSubmit, onBlur, value, buttonText, hint, previewOptions}) {
    const onChangeFunc = (event) => {
        event.preventDefault();
        onChange && onChange(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit && onSubmit(document.getElementById("searchBar").value);
    };

    const handleBlur = (event) => {
        event.preventDefault();
        event.stopPropagation();

        onBlur && onBlur(event.target.value);
    }


    return (<div className={" searchBarDiv dropdown-select"}>

        <Form onSubmit={handleSubmit} onBlur={handleBlur}>

            <InputGroup>
            <div class="outlineBorder">
                <input id={"searchBar"} name={"filterTerm"} list={"suggestions"}
                       data-bs-toggle={"dropdown"}
                       type={"search"}
                       autoComplete={"on"}
                       placeholder={hint} onChange={onChangeFunc} value={value}/>
                <Button variant={"light"} type={"submit"}>
                {""}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CCD7E4" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                </Button>
            </div>
            </InputGroup>

        </Form>

    </div>)
}

export default Searchbar;

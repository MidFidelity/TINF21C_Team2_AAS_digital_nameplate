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
                <input id={"searchBar"} name={"filterTerm"} list={"suggestions"}
                       data-bs-toggle={"dropdown"}
                       type={"search"}
                       autoComplete={"on"}
                       placeholder={hint} onChange={onChangeFunc} value={value}/>
                <Button variant={"outline-success"} type={"submit"}>{buttonText}</Button>
            </InputGroup>

        </Form>

    </div>)
}

export default Searchbar;

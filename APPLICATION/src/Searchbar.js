import {Button, ListGroup} from "react-bootstrap";
import "./Searchbar.scss"
import {useEffect, useRef, useState} from "react";

function Searchbar({onChange, onSubmit, onBlur, hint, suggestions, className, value}) {
    const containerRef = useRef()
    const inputRef= useRef()
    const [isFocused, setFocused] = useState(false)
    const [textValue, setTextValue] = useState(value ? value : "")
    const [filteredSuggestions, setFilteredSuggestions] = useState([])

    useEffect(() => {
        console.log(document.activeElement)
        if (containerRef.current.contains(document.activeElement)) {
            setFocused(true)
        } else {
            setFocused(false)
        }
    }, [document.activeElement])

    useEffect(()=>{
        setFilteredSuggestions(suggestions?suggestions:[])
        filterSuggestions()
    }, [suggestions])


    const handleChange = (event) => {
        event.preventDefault();
        setTextValue(event.target.value)

        filterSuggestions()
        onChange && onChange(event.target.value);
    };

    const handleSubmit = (text) => {
        onSubmit && onSubmit((typeof text === "string")?text:textValue);
    };

    const handleFocus = () => {

        setFocused(true)
    }

    const handleBlur = () => {

        setFocused(false)
        onBlur && onBlur(textValue);
    }

    const handleSuggestionClick = (event) => {
        setTextValue(event.target.textContent)
        handleSubmit(event.target.textContent)
    }

    const filterSuggestions = () => {
        if (suggestions) {
            setFilteredSuggestions(suggestions.filter((item) => (item.match(new RegExp(textValue, 'i')))))
        }
    }

    return (<div className={"search-container " + className}>
        <div id={"buttonContainer"} className={"d-flex flex-column outlineBorder bg-light foreground position-relative"}
             ref={containerRef} onBlur={handleBlur} onFocus={handleFocus}>
            <form onSubmit={handleSubmit}>
                <div className={"d-flex flex-row"}>
                    <input id={"searchBar"}
                           ref={inputRef}
                           className={"w-100 border-0 bg-transparent outline-none"}
                           name={"searchTerm"}
                           type={"search"}
                           placeholder={hint}
                           onChange={handleChange}
                           value={textValue ? textValue.toString() : ""}
                           autoComplete={"off"}/>
                    <Button variant={"flush"} type={"submit"} className={"ms-auto"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CCD7E4"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </Button>
                </div>
            </form>
            {suggestions ? <div className={`${isFocused ? "" : "h-0"}  foreground animate-height suggestion-box`}>
                <ListGroup>
                    {filteredSuggestions.map((suggestion, index) => (<ListGroup.Item key={index} action
                                                                                     onClick={handleSuggestionClick}>{suggestion}</ListGroup.Item>))}
                </ListGroup>
            </div> : ""}
        </div>
    </div>)


}

export default Searchbar;

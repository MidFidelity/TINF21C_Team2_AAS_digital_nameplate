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

    const handleBlur = (event)=>{
        event.preventDefault();
        event.stopPropagation();

        onBlur&&onBlur(event.target.value);
    }


    return <div className={"searchBarDiv"}>
        <form onSubmit={handleSubmit} onBlur={handleBlur}>
            {previewOptions &&
                <datalist id={"previewOptions"}>{previewOptions.map((item, index) => <option key={index}>item</option>)}</datalist>}

            <input id={"searchBar"} name={"filterTerm"} list={"suggestions"} className={"searchBarInput"} type={"search"}
                   autoComplete={"on"}
                   placeholder={hint} onChange={onChangeFunc} value={value}/>
            <button className={"searchBarButton"}>{buttonText}</button>
        </form>
    </div>
}
export default Searchbar;

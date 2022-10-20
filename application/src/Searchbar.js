function Searchbar({onChange, onSubmit, value, buttonText, hint, previewOptions}) {
    const onChangeFunc = (event) => {
           onChange && onChange(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit && onSubmit(event.target.value);
    };


    return <div className={"searchBarDiv"}>
        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
            {previewOptions &&
                <datalist id={"previewOptions"}>{previewOptions.map((item, index) => <option key={index}>item</option>)}</datalist>}

            <input name={"filterTerm"} list={"suggestions"} className={"searchBarInput"} type={"search"}
                   autoComplete={"on"}
                   placeholder={hint} onChange={onChangeFunc} value={value}/>
            <button className={"searchBarButton"}>{buttonText}</button>
        </form>
    </div>
}
export default Searchbar;

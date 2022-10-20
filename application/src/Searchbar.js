function Searchbar({onChange, onSubmit, value, buttonText, hint}) {
    const onChangeFunc = (event) => {
           onChange && onChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit && onSubmit();
    }


    return <div className={"searchBarDiv"}>
        <form onSubmit={handleSubmit} onBlur={handleSubmit}>
            <input name={"filterTerm"} list={"suggestions"} className={"searchBarInput"} type={"search"}
                   autoComplete={"on"}
                   placeholder={hint} onChange={onChangeFunc} value={value}/>
            <button className={"searchBarButton"}>{buttonText}</button>
        </form>
    </div>
}
export default Searchbar;

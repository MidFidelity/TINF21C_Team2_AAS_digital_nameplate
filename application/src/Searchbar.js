import React from "react"
import PropTypes from "prop-types";

export default class Searchbar extends React.Component{
    static propTypes = {
        onChangeFunction: PropTypes.func,
        onSubmitFunction: PropTypes.func,
        textContent: PropTypes.string,
        searchButtonText: PropTypes.string,
        hintText: PropTypes.string
    }

    onChange = (event) => {
        if (this.props.onChangeFunction) {
            this.props.onChangeFunction(event.target.value);
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        event.stopPropagation();
        this.props.onSubmitFunction()
    }

    render() {
        return (
            <div className={"searchBarDiv"}>
                <form onSubmit={this.handleSubmit} onBlur={this.handleSubmit}>
                    <input name={"filterTerm"} list={"suggestions"} className={"searchBarInput"} type={"search"} autoComplete={"on"}
                           placeholder={this.props.hintText} onChange={this.onChange} value={this.props.textContent}/>
                    <button className={"searchBarButton"}>{this.props.searchButtonText}</button>
                </form>
            </div>
    );
    }
    }
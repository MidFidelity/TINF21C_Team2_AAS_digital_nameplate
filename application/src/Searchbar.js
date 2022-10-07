import React from "react"
import PropTypes from "prop-types";

export default class Searchbar extends React.Component{
    static propTypes = {
        onChangeFunction:PropTypes.func,
        searchText:PropTypes.string,
        hintText:PropTypes.string
    }

    onChange=(event)=>{
        if (this.props.onChangeFunction) {
            this.props.onChangeFunction(event.target.value);
        }
    }

    render() {
        return (
            <div className={"searchBarDiv"}>
                <input list={"suggestions"} className={"searchBarInput"} type={"search"} autoComplete={"on"} placeholder={this.props.hintText} onChange={this.onChange}/>
                <button className={"searchBarButton"}>{this.props.searchText}</button>
            </div>
        );
    }
}
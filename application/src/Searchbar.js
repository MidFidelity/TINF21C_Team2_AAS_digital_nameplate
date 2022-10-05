import React from "react"
import PropTypes from "prop-types";

export default class Searchbar extends React.Component{
    static propTypes = {
        predictList:PropTypes.array,
        onChangeFunction:PropTypes.func,
        searchText:PropTypes.string,
        hintText:PropTypes.string
    }

    noop=()=>{};

    onChange=(event)=>{
        console.log(event);
        this.props.onChangeFunction(event.target);
    }

    render() {
        return (
            <div className={"searchBarDiv"}>
                <datalist id={"suggestions"}>
                    {this.props.predictList.map((item, index)=><option value={item} key={index}></option>)}
                </datalist>

                <input list={"suggestions"} className={"searchBarInput"} type={"search"} autoComplete={"on"} placeholder={this.props.hintText} onChange={this.props.onChangeFunction?this.onChange:this.noop}/>
                <button className={"searchBarButton"}>Search</button>
            </div>
        );
    }
}
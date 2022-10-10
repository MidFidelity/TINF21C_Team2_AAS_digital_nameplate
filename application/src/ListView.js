import React from "react";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar";
import AssetList from "./AssetList";

export function withRouter(Children){
    return(props)=>{
        const {term} = useParams()
        return <Children {...props}  searchTerm = {term?term:""}/>
    }
}

class ListView extends React.Component{
    static propTypes={
        tableData: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state={
            filteredTableData:[],
            filterTerm:""
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps!==this.props){
            this.filterTableData(this.state.filterTerm)
        }
    }

    componentDidMount() {
        this.filterTableData();
    }

    updateFilter=(term)=>{
        this.setState({filterTerm:term}, ()=>{
            this.filterTableData();
        })
    }

    filterTableData = (filterString = this.state.filterTerm) => {
        this.setState({filteredTableData: this.props.tableData.filter(item => item.displayName.toLowerCase().includes(filterString.toLowerCase()))})
    }

render(){
    return(
    <div className="ListView">
        <Searchbar hintText={"HintText"} searchText={"SearchText"}
                   onChangeFunction={this.updateFilter}></Searchbar>
        <AssetList tableData={this.state.filteredTableData}
        entryClickHandler={this.openAsset}></AssetList>
    </div>);
}
}

export default withRouter(ListView);
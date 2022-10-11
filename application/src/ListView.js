import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar";
import AssetList from "./AssetList";

export function withRouter(Children){
    return(props)=>{
        const {term} = useParams()
        return <Children {...props}  filterTerm = {term?term:""} navHook={useNavigate()}/>
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
            filterTerm:this.props.filterTerm?this.props.filterTerm:""
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps!==this.props){
            this.updateFilter(this.props.filterTerm?this.props.filterTerm:"")
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

    updateRoute=()=>{
        this.props.navHook("/search/"+this.state.filterTerm)
    }

    filterTableData = (filterString = this.state.filterTerm) => {
        this.setState({filteredTableData: this.props.tableData.filter(item => item.displayName.toLowerCase().includes(filterString.toLowerCase()))})
    }



render(){
    return(
    <div className="ListView">
        <Searchbar hintText={"HintText"}
                   searchButtonText={"SearchText"}
                   onChangeFunction={this.updateFilter}
                    textContent={this.state.filterTerm}
                    onSubmitFunction={this.updateRoute}></Searchbar>
        <AssetList tableData={this.state.filteredTableData}></AssetList>
    </div>);
}
}

export default withRouter(ListView);
/**
 * Created by Mark Aquino on 1/13/17.
 */
import React, {Component} from 'react';
import './App.js';
import AttributesCheckboxContainer from './AttributesCheckboxContainer.js';
import Message from '../components/Message'
require('css!../css/DropDown.css');
import SelectMenu from '../components/SelectMenu';
class MeasurementSelection extends Component {
    constructor() {
        super();
        this.state = {
            checked: {},
            attributes: [],
            counter: 0
        }
    }

    handleChange = (e) => {
        let selected = e.target.value;
        let attributes = this.props.assays.filter(i => i.name === selected)[0].attributes;

        this.setState({
            selected: e.target.value,
            attributes: attributes,
            checked: {}
        });
    }

    handleClickFactory = (attr) => {
        return (e) => {
            this.setState((oldState) => {
                const isChecked = oldState.checked[attr.name];
                const newChecked = {...oldState.checked};
                if (isChecked) {
                    delete newChecked[attr.name];
                } else {
                    newChecked[attr.name] = true;
                }
                this.props.clickHandler(this.state.selected, newChecked, this.props.counter);
                return {...oldState, checked: newChecked};
            });
        };
    };

    toggleSelect = () => {
        const newState = {};

        //let unchecked = {};
        const attributes = this.state.attributes;
        const unchecked = attributes.find(a => this.state.checked[a.name] !== true);

        if (unchecked) {
            attributes.forEach(a => newState[a.name] = true);
        }
        else {
            attributes.forEach(a => delete newState[a.name])
        }

        this.setState({checked: newState});
        this.props.clickHandler(this.state.selected, newState, this.props.counter);
    }

    selectOptions= () => {
        const assays = this.props.assays;

        if (assays) {
            let selectOptions = assays.map((item, index) => {
                return (<option key={index} value={item.name}>{item.name}</option>);
            });
            return selectOptions;
        }
    }

    attributeChecklist =() =>{
        const selected = this.state.selected;
        const assays = this.props.assays;
        let list =[];
        if (selected && assays){
            const filtered = assays.filter((i) => i.name === selected);
            list = <AttributesCheckboxContainer attributes={filtered[0].attributes} selected={this.state.checked}
                                                onClick={this.handleClickFactory}
                                                toggleSelect={this.toggleSelect}/>;
        }
        return list;
    }

    render() {

        return (
            <div className="container">
                <SelectMenu onChange={this.handleChange} options={this.selectOptions()}/>
                <Message text={`Select attributes for ${this.state.selected} Request` }/>
                {this.attributeChecklist()}
                <br/>
            </div>
        )
    }
}


export default MeasurementSelection;
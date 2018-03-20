/**
 * Created by Mark Aquino on 1/17/17.
 */
import React, {Component} from 'react';
import './App.js';
import BootstrapRow from '../components/BootstrapRow'
import Button from '../components/Button';
import CheckBox from '../components/CheckBox'
require('style!css!../css/CheckList.css');

class AttributesCheckboxContainer extends Component {

    render() {
        const attributes = this.props.attributes;
        const selectedAttributes = this.props.selected;
        const items = attributes.map((item, i) => {
            const isSelected = selectedAttributes[item.name] ? true : false;
            return (<CheckBox key={i} message={item.name} onClick={this.props.onClick(item)} checked={isSelected}/>);
        });
        return (
            <div className="container">
                <BootstrapRow >
                    {items}
                </BootstrapRow>
                <br/>
                <BootstrapRow>
                    <div className="col-sm-12">
                        <Button onClick={this.props.toggleSelect} label="Select All"/>
                    </div>
                </BootstrapRow>
            </div>
        );
    }
}

export default AttributesCheckboxContainer;

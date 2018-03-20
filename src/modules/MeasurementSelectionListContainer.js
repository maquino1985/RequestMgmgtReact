/**
 * Created by Mark Aquino on 3/16/17.
 */
import React, {Component} from 'react';
import MeasurementSelection from './MeasurementSelection.js';
import {Map as iMap} from "immutable";
import RequestSubmissionContainer from './RequestSubmissionContainer.js';
import {Link} from 'react-router';
import Message from '../components/Message';
import Button from '../components/Button';
import ButtonGroup from '../components/ButtonGroup';
import ButtonToolbarRow from '../components/ButtonToolbarRow';
import axios from 'axios';
class MeasurementSelectionListContainer extends Component {

    constructor() {
        super();
        this.state = {
            counter: 1,
            assays: [{
                name: "Endotoxin Measurement",
                description: "Endotoxin Assay",
                attributes: [
                    {
                        name: "Endotoxin Level",
                        description: "Endotoxin Level"
                    },
                    {
                        name: "Endotoxin Level Value",
                        description: "Endotoxin Level Value"
                    },
                    {
                        name: "Result",
                        description: "Result"
                    }
                ]
            },
                {
                    name: "MS Analytics",
                    description: "Mass Spectroscopy Analytics",
                    attributes: [
                        {name: "Identity Confirmed", description: "Identity confirmed"},
                        {name: "PMF Coverage", description: ""},
                        {name: "PTM Glycolylation", description: ""},
                        {name: "PTM Phosphorylation", desciption: ""},
                        {name: "Oxidation", description: ""},
                        {name: "Deamidation"},
                        {name: "Isomerization"},
                        {name: "Total Mass"},
                        {name: "Method"}



                        // {
                        //     name: "Result",
                        //     description: "Result"
                        // },
                        // {
                        //     name: "MW determination",
                        //     description: "mol wt determination"
                        // },
                        // {
                        //     name: "MW determination (reduced molecule)",
                        //     description: "MW Determination (reduced molecule)"
                        // },
                        // {
                        //     name: "MW determination (deglycosylated molecule)",
                        //     description: null
                        // },
                        // {
                        //     name: "MW determination (deglycosylated and reduced molecule)",
                        //     description: null
                        // },
                        // {
                        //     name: "Sequence coverage",
                        //     description: null
                        // },
                        // {
                        //     name: "Sequence coverage - applied enzymes",
                        //     description: null
                        // },
                        // {
                        //     name: "Confirmed termini",
                        //     description: null
                        // },
                        // {
                        //     name: "Aglycosylated (HC) (<3% acceptable)",
                        //     description: null
                        // },
                        // {
                        //     name: "Man3 (est.)",
                        //     description: null
                        // },
                        // {
                        //     name: "Man5 (est)",
                        //     description: null
                        // },
                        // {
                        //     name: "G0 (est.)",
                        //     description: null
                        // },
                        // {
                        //     name: "G0F (est.)",
                        //     description: null
                        // },
                        // {
                        //     name: "G1F (est.)",
                        //     description: null
                        // },
                        // {
                        //     name: "G2F (est.)",
                        //     description: null
                        // }
                    ],
                },
                {
                    name: "SDS-PAGE",
                    description: "SDS-PAGE",
                    attributes: [
                        {
                            name: "Purity",
                            description: null
                        },
                        {
                            name: "Purity Value",
                            description: null
                        },
                        {
                            name: "Homogeneous",
                            description: null
                        },
                        {
                            name: "Mass",
                            description: null
                        }
                    ]
                }
            ],
            dropDownMenuMap: iMap(),
        }
    }
    componentDidMount(){
        var _this = this;
        this.serverRequest = axios({method: 'get', url: 'http://callisto.bos.us.genedata.com:22080/ExternalWebServices/ws/measurementTypes', responseType: 'document'})
            .then(function(result) {
                //array of items which represent the Java EntrySet for every measurement attribute passed via the api
                const array = Array.prototype.slice.call(result.data.childNodes[0].childNodes[0].children);
                const assays = [];
                for (let i=0;i<array.length;i++){
                    let assay = {};
                    let assayName = array[i].getElementsByTagName('measurementType')[0].firstChild.nodeValue;
                    let measurementAttrs = array[i].getElementsByTagName('measurementAttribute');

                    let attributes =[];

                    for (let j=0;j<measurementAttrs.length;j++){
                        let attribute = {};
                        attribute.name = measurementAttrs[j].firstChild.nodeValue;
                        attributes.push(attribute);
                    }
                    assay.name = assayName;
                    assay.attributes = attributes;
                    //console.log(assay);
                    assays.push(assay);


                }
                console.log('Assays loaded from external database');
                _this.setState({
                    assays: assays
                });
            });
    }

    componentWillUnmount(){
        this.serverRequest.abort();
    }
    addDropDown = () => {
        let count = this.state.counter;
        this.setState({counter: ++count});
    }

    removeDropDown = () => {
        let count = this.state.counter;
        if (count === 1) {
            return;
        }

        const map = this.state.dropDownMenuMap;
        count = --count;
        const newmap = map.delete(count);
        //print the measurement type and the checked attributes
        newmap.keySeq().forEach(k => {
            const value = newmap.get(k);
            const measurementType = value.measurement;
            const attributes = Object.keys(value.attributes);
            console.log(measurementType + ":" + attributes);
        });
        this.setState({
            counter: count,
            dropDownMenuMap: newmap
        });
    }

    //requires some attributes to be clicked.  OK...or need to predefine in initial state?
    handleClick = (selected, checked, key) => {
        let dropDownMenuMap = this.state.dropDownMenuMap;
        const len = Object.keys(checked).length;
        dropDownMenuMap = dropDownMenuMap.set(key, {measurement: selected, attributes: checked});
        this.setState({
            dropDownMenuMap: dropDownMenuMap
        });
    }

    messageHandler = (msg) => {
        let statusMessage = msg[0];
        this.setState({
            statusMessage: statusMessage
        });
    }

    render() {
        const assays = this.state.assays;
        const measurements = this.state.measurements;
        let dropDowns = [];
        for (let i = 0; i < this.state.counter; i++) {
            dropDowns.push(<MeasurementSelection key={i} clickHandler={this.handleClick} assays={assays} counter={i}/>);
        }
        if (this.props.requestIds === undefined) {
            return null;
        }

        return (
            <div className="container ">
                {dropDowns}
                <ButtonToolbarRow>
                    <ButtonGroup>
                        <Button onClick={this.addDropDown} label="+"/>
                        <Button onClick={this.removeDropDown} label="-"/>
                    </ButtonGroup>
                    <ButtonGroup>
                        <RequestSubmissionContainer requestedEntityIds={this.props.requestIds}
                                                    formData={this.state.dropDownMenuMap}
                                                    messageHandler={this.messageHandler}/>
                    </ButtonGroup>
                </ButtonToolbarRow>
                <Message text={this.state.statusMessage}/>
            </div>
        );
    }
}

export default MeasurementSelectionListContainer;
/**
 * Created by Mark Aquino on 1/24/17.
 */
import React, {Component} from 'react';
import $ from 'jquery'
import {Map as iMap} from "immutable";
import Button from '../components/Button'
class RequestSubmissionContainer extends Component {

    constructor() {
        super();
        this.state = {
            requestForm: {
                requestEntityIds: [],
                measurementTypes: iMap()
            },
            success: false
        }
    }

    measurementTypeMapForRequest(nextProps) {
        const dropDownMenuMap = nextProps.formData;
        let map = iMap();

        dropDownMenuMap.keySeq().forEach(k => {
            const value = dropDownMenuMap.get(k);
            const measurementType = value.measurement;
            const attributes = Object.keys(value.attributes);
            map = map.set(measurementType, attributes);
        });
        return map;
    }

    parseXml = (xmlQueue) => {
        const result = [];
        const xmlNodes = Array.prototype.slice.call(xmlQueue.childNodes);
        while (xmlNodes.length > 0) {
            let node = xmlNodes.shift();
            let len = node.childNodes.length;
            if (len === 1) {
                result.push(node.innerHTML);
                //console.log(node.innerHTML);
                continue;
            }
            for (let i = 0; i < len; i++) {
                const child = node.childNodes[i];
                xmlNodes.push(child);
            }
        }
        return result;
    };

    handleSubmit = (e) => {
        let form = JSON.stringify(this.state.requestForm);
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://callisto.bos.us.genedata.com:22080/ExternalWebServices/ws/request",
            "method": "POST",
            data: form,
            contentType: 'application/json; charset=UTF-8',
            "headers": {},
            success: (result) => {
                const response = this.parseXml(result);
                this.props.messageHandler(response);
                this.setState({
                    success: true,
                    response: response[0]
                })
            },
            error: (response) => {
                const errormsg = this.parseXml(response.responseXML);
                //alert(response.statusText + ":" + errormsg);
                this.props.messageHandler(errormsg);
                this.setState({
                    success: false,
                    response: errormsg
                })
            }
        }
        $.ajax(settings).done(function (response) {
            console.log(response);
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            const measurementTypesMap = this.measurementTypeMapForRequest(nextProps);
            const requestForm = this.state.requestForm;
            const requestEntityIds = this.props.requestedEntityIds;
            requestForm.measurementTypes = measurementTypesMap;
            if (requestEntityIds) {
                requestForm.requestEntityIds = requestEntityIds.split(",");
            }
            this.setState({
                requestForm: requestForm,
            });
        }
    }

    render() {
        return (
            <Button id="submit-btn"
                    onClick={this.handleSubmit}
                    label='request'/>
        );
    }

    printMap(map) {
        map.keySeq().forEach(k => {
            const value = map.get(k);
            console.log(value);
        });
    }
}

export default RequestSubmissionContainer;
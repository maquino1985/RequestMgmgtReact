/**
 * Created by Mark Aquino on 4/24/17.
 */
import React, { Component } from 'react'
import axios from 'axios'
class MeasurementTypeWsClient extends Component{

    constructor(){
        super();
        this.state = {
            assays: []
        }
    }
    componentDidMount(){
        var _this = this;
        axios({method: 'get', url: 'http://localhost:8080/ExternalWebServices/ws/mt/get', responseType: 'document'})
            .then(function(result) {
                console.log(result.data);
                //array of items which represent the Java EntrySet for every measurement attribute passed via the api
                const array = Array.prototype.slice.call(result.data.childNodes[0].childNodes[0].children);
                const assays = [];
                for (let i=0;i<array.length;i++){
                    let map = {};
                    let assayName = array[i].getElementsByTagName('measurementType')[0].firstChild.nodeValue;
                    let attributes = array[i].getElementsByTagName('measurementAttribute');

                    let a =[]
                    for (let j=0;j<attributes.length;j++){
                        a.push(attributes[j].firstChild.nodeValue);
                    }
                    map.name = assayName;
                    map.attributes = a;
                    assays.push(map);
                    console.log(map);

                }
                _this.setState({
                    assays: assays
                });
            });
    }
    componentWillUnmount(){
        this.serverRequest.abort();
    }
    render(){
        return (
            <div>
            </div>
        );
    }
}

export default MeasurementTypeWsClient;
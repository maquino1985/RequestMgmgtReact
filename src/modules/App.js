import React, {Component} from 'react';
import MeasurementSelectionListContainer from './MeasurementSelectionListContainer'
import ErrorMessage from './ManualCompleteRequestForm'
import MeasurementTypeWsClient from '../data/MeasurementTypeWsClient'
class App extends Component {

    render() {
        const requestIds = this.props.location.query.requestIds;
        const message = requestIds ? <div>(<strong>Request for:</strong> <i>{requestIds}</i>)</div> : undefined;
        return (
            <div className="App">
                <div className="App-header">
                </div>
                <p className="App-intro">Lab Analytics Requisition Form
                </p>
                {message || <ErrorMessage/>}
                <br/>
                <MeasurementSelectionListContainer requestIds={requestIds}/>
                    {this.props.children}
            </div>
        );
    }

}

export default App;

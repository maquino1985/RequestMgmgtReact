/**
 * Created by Mark Aquino on 3/15/17.
 */
import React, {Component} from 'react';
import $ from 'jquery'

export default React.createClass({
    redirect(e){
        e.preventDefault();
        const pageurl = $(location).attr("href");
        const text = $('#basic-url').val();
        const redirectUrl = pageurl + "request?requestIds=" + text;
        console.log('redirect to: ' + redirectUrl);
        $(location).attr("href", redirectUrl);
    },
    render(){
        const err = <strong>Provide comma-separated Parent Entity IDs for the Analytics Request in the field
            below:</strong>
        const msg = "URL must match format http://{server}:{port}/request?requestIds={ids}"
        return (<div>
                {err}<br/>
                <small className="text-muted">
                    {msg}
                </small>
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">http://callisto:3001/request?requestIds=</span>
                            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon1"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.redirect}>Go</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})
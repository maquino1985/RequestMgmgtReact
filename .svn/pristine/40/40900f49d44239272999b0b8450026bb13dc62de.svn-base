/**
 * Created by Mark Aquino on 3/10/17.
 */
import React, {Component} from 'react'
import  {Link}  from 'react-router'

class PageRouter extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ul role="nav" className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><a href="http://callisto.bos.us.genedata.com:14080/Biologics/common/login.seam">Genedata
                                Biologics&trade;</a></li>
                            <li><a
                                href="http://callisto.bos.us.genedata.com:14080/Biologics/common/report/ReportView.seam?reportViewId=49">View
                                Analytics Requests</a></li>
                        </ul>
                    </div>
                </div>
                {this.props.children}
            </div>);

    }
}

export default PageRouter;


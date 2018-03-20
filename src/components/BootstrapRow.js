/**
 *
 * Created by Mark Aquino on 3/24/17.
 */

import React from 'react'

const BootstrapRow = (props) => {
    return(
        <div className="row-sm-12">
                {props.children}
        </div>
    )
}

export default BootstrapRow;
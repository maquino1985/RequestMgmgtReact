/**
 * Created by Mark Aquino on 3/24/17.
 */
import React from 'react'

const ButtonToolbarRow = (props) =>{
    return(
        <div className="row-sm-12">
            <div className="col">
                <div className="btn-toolbar">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ButtonToolbarRow;
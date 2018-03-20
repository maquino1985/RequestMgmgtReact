/**
 * Created by Mark Aquino on 3/24/17.
 */
import React from 'react';

const ButtonGroup = (props) => {
    return(
        <div className="btn-group">
            {props.children}
        </div>
    )
}

export default ButtonGroup;
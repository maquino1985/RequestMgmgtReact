/**
 * Created by Mark Aquino on 3/9/17.
 */
import React from 'react';

const Message = ({text}) => {
    return(
        <div className="row">
            <div className="col">
                {text}
            </div>
        </div>
    )
}

export default Message;
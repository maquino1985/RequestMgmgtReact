/**
 *
 * Created by Mark Aquino on 3/24/17.
 */

import React from 'react'

const SelectMenu =({onChange, options})=>{
    return(
        <div className="row">
            <div className="col">
                <select required className="form-control" onChange={onChange}>
                    <option selected disabled>Select Analytic</option>
                    {options}
                </select>
            </div>
        </div>
    )
}


export default SelectMenu;
/**
 * Created by Mark Aquino on 3/24/17.
 */
import React  from 'react'

const CheckBox = ({checked, onClick, message}) => {
    return (
        <div className="col-sm-4">
            <div>
                <label className="checkbox">
                    <input className="" type="checkbox" checked={checked} onChange={onClick}/> {message}
                </label>
            </div>
        </div>);
}

export default CheckBox;
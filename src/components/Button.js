/**
 * Created by Mark Aquino on 3/24/17.
 */
import React  from 'react'

const Button = ({label, onClick, id}) => {
    return (
        <button id={id} className="btn btn-outline-primary " type="button" onClick={onClick}>
            <b>{label}</b>
        </button>);
}

export default Button;
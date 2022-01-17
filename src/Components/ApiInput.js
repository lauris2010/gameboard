import React from 'react'
import { Store } from '../context/Store'


const ApiInput = () => {
    const { state, dispatch } = React.useContext(Store);
    
    const handleChange = (e) => {
        dispatch({
            type: 'SET_URL',
            payload: {
                baseURL: e.target.value
            }
        })
    };

    return (
        <div>
            <label>API base URL</label>
            <input onChange={handleChange} className="form-control" type="text" value={state.baseURL}></input>
        </div>
    )
}

export default ApiInput
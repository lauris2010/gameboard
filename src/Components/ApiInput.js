import React from 'react'

const ApiInput = () => {
    return (
        <div>
            <label for="api_base">API base URL</label>
            <input className="form-control" type="text" value={`https://dev-games-backend.advbet.com/v1/ab-roulette/$1`}></input>
        </div>
    )
}

export default ApiInput
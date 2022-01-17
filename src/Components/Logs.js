import React from 'react'

const Logs = ({logs}) => {
    return (
        <div className='col-xs-12'>
            <h4>Log</h4>
            <pre className='pre'>
                {logs.map((log, index) => <div key={index}>{log}</div>)}
            </pre>
        </div>
    )
}

export default Logs
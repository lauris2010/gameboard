import React from 'react'

export const GameBoard = ({configuration, result}) => {
    const colors =  configuration.colors
    const positions = configuration.positionToId
    const results = configuration.results

    return (
        <div className='col-xs-12'>
            <h4>Gameboard</h4>
            {positions?.map(position => (
                <button 
                    key={position} 
                    className={`${position === result ? 'highlightSlot' : ''} col-xs-1 btn btn-${colors[position]}`}
                >
                    {results[position]}
                </button>
            ))}
        </div>
    )
}


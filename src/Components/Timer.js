import React from 'react'

const Timer = ({nextGame, getGameResult, results}) => {
    const[seconds, setSeconds] = React.useState(nextGame.fakeStartDelta)
    
    React.useEffect(()=> {
        const timer = () => {
            setTimeout(() =>{
                if (seconds <= 0){
                    getGameResult()
                    clearTimeout(timer)
                    return
                }
                setSeconds(seconds - 1)
            }, 1000)
        }
        timer()
    }, [seconds])

    return (
        <div>
            <div className='col-xs-12'>
                <div className='row'>
                    <h4>Events</h4>
                    <ul id="event_box" className="list-group">
                        {
                            results.map((result) => 
                                <li key={result.id} className="list-group-item">Game {result.id} ended, result is {result.result} </li>
                            )
                        }
                        <li className="list-group-item">Game {nextGame.id} will start in {seconds}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Timer

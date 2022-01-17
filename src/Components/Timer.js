import React from 'react'

const Timer = ({nextGame, getGameResult, results}) => {
    const [seconds, setSeconds] = React.useState(nextGame.fakeStartDelta)
    
    React.useEffect(()=> {
        let timer = null;

        if (seconds < 0) {
            clearTimeout(timer)
            return
        }

        if (seconds === 0) {
            getGameResult()
            clearTimeout(timer)
            return
        } 

        timer = setTimeout(
            () => setSeconds((previousSeconds) => previousSeconds - 1)
        , 1000);
        
        return () => {
            clearTimeout(timer)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds, nextGame])

    return (
        <div>
            <div className='col-xs-12'>
                <div className='row'>
                    <h4>Events</h4>
                    <ul id="event_box" className="list-group">
                        {
                            results.map((resultObj) => (
                                <li key={resultObj.id} className="list-group-item">Game {resultObj.id} ended, result is {resultObj.result} </li> )
                            )
                        }
                        { !isNaN(seconds) && <li className="list-group-item">Game {nextGame.id} will start in {seconds}</li> }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Timer

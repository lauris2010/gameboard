import React from 'react';
import './App.css';
import ApiInput from './Components/ApiInput';
import { GameBoard } from './Components/GameBoard';
import StatisticsTable from './Components/StatisticsTable';
import Timer from './Components/Timer';
import * as modules from './modules'


function App() {
  const [configuration, setConfiguration] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [stats, setStats] = React.useState([])
  const [nextGame, setNextGame] = React.useState({})
  const [results, setResults] = React.useState([])

  
  const getConfiguration = async () => {
    const configurationData = await modules.getConfiguration()
    if (configurationData) { 
      setConfiguration(configurationData)
    }
  }

  const getNextGame = async () => {
    const nextGameData = await modules.getNextGame()
    if (nextGameData) {
      setNextGame(nextGameData)
    }
  }

  const getStats = async () => {
    const statsData = await modules.getStats()
    if (statsData) {
      setStats(statsData)
    }
  }

  const getGameResult = async () => {
    setLoading(true)
    const gameResultData = await modules.getSpin(nextGame.uuid)
    if(!isNaN(gameResultData?.result)){
      setResults((previousResults) => [...previousResults, gameResultData])
      await getStats()
      await getNextGame()
      setLoading(false)
    } else {
      setTimeout(() => {
        getGameResult()
      }, 1000);
    }
  }

  React.useEffect(() => {
    const FetchData = async () => {
      await getConfiguration()
      await getStats()
      await getNextGame()
      setLoading(false)
    }
    FetchData()
  }, [])

  return (
    <div className="App">
      <div className='container'>
        <h1>Roulette game API demo</h1>
        <ApiInput/>
        <h4>Stats (last 200)</h4>
          <StatisticsTable configuration={configuration} stats={stats}/>
          <div className='col-xs-6'>
            <GameBoard configuration={configuration}/>
            {nextGame.fakeStartDelta && <Timer key={nextGame.fakeStartDelta} getGameResult={getGameResult} results={results} nextGame={nextGame}/>}
          </div>
      </div>
    </div>
  );
}

export default App;

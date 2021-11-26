import React from 'react';
import './App.css';
import ApiInput from './Components/ApiInput';
import { GameBoard } from './Components/GameBoard';
import { Loader } from './Components/Loader';
import Logs from './Components/Logs';
import StatisticsTable from './Components/StatisticsTable';
import Timer from './Components/Timer';
import * as modules from './modules'


function App() {
  const [configuration, setConfiguration] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [stats, setStats] = React.useState([])
  const [nextGame, setNextGame] = React.useState({})
  const [results, setResults] = React.useState([])
  const [logs, setLogs] = React.useState([])

  const addLog = (message) => {
    setLogs((previousLogs) => [...previousLogs, `${new Date().toISOString()} - ${message}`])
  }

  const getConfiguration = async () => {
    addLog('GET .../configuration')
    const configurationData = await modules.getConfiguration()
    if (configurationData) { 
      setConfiguration(configurationData)
      addLog('Checking for new game')
    }
  }

  const getNextGame = async () => {
    addLog('GET .../nextGame')
    const nextGameData = await modules.getNextGame()
    if (nextGameData) {
      setNextGame(nextGameData)
      addLog(`sleeping for fakeStartDelta ${nextGameData.fakeStartDelta}`)
    }
  }

  const getStats = async () => {
    addLog('GET .../stats?limit=200')
    const statsData = await modules.getStats()
    if (statsData) {
      setStats(statsData)
    }
  }

  const getGameResult = async () => {
    addLog('Spinning the wheel')
    addLog(`GET .../game/${nextGame.id}`)
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
      addLog('Loading game board')
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
            <GameBoard configuration={configuration} result={results[results.length-1]?.result}/>
            {nextGame.fakeStartDelta && <Timer key={nextGame.fakeStartDelta} getGameResult={getGameResult} results={results} nextGame={nextGame}/>}
          </div>
          <div className='col-xs-6'>
            <Logs logs={logs}/>
            {loading && <Loader/>}
          </div>
      </div>
    </div>
  );
}

export default App;

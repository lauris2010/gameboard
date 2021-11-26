import React from 'react';
import './App.css';
import ApiInput from './Components/ApiInput';
import { GameBoard } from './Components/GameBoard';
import StatisticsTable from './Components/StatisticsTable';
import * as modules from './modules'


function App() {
  const [configuration, setConfiguration] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [stats, setStats] = React.useState([])
  const [nextGame, setNextGame] = React.useState({})

  
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
          </div>
      </div>
    </div>
  );
}

export default App;

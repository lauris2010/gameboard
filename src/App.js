import React from 'react';
import './App.css';
import ApiInput from './Components/ApiInput';
import StatisticsTable from './Components/StatisticsTable';
import * as modules from './modules'


function App() {
  const [configuration, setConfiguration] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [stats, setStats] = React.useState([])
  
  const getConfiguration = async () => {
    const configurationData = await modules.getConfiguration()
    if (configurationData) { 
      setConfiguration(configurationData)
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
      </div>
    </div>
  );
}

export default App;

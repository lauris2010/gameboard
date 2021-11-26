import React from 'react'
import '../App.css'


const StatisticsTable = ({configuration, stats}) => {
    const colors = configuration.colors
    const sortedStats = stats.sort((a,b) => a.count > b.count ? 1 : -1)
    console.log(colors)
    return (
        <div>
            <table id='stats' className='table'>
                <tbody>
                    <tr> 
                        <td></td>
                        <th colSpan='5' className='cold'>Cold</th>
                        <th colSpan='27' className='neutral'>Neutral</th>
                        <th colSpan='5' className='hot'>hot</th>
                    </tr>
                    <tr>
                        <th>Slot</th>
                        {
                            sortedStats.map((stat, index) => (
                                <td key={index} className={`btn-${colors[stat.result]}`}>{stat.result}</td>
                            ))
                        }
                    </tr>
                    <tr>
                        <th>Hits</th>
                        {
                            sortedStats.map((count, index) => {
                                const color = index < 5 ? 'cold' : index < stats.length - 5 ? 'neutral' : 'hot'
                                return  <td key={index} className={color}>{count.count}</td>
                            })
                        }
                    </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default StatisticsTable


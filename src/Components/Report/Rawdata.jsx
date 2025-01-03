import React from 'react'

const Rawdata = ({Result,selectedItem}) => {
  return (
    <>

<div>
            {/* Display Row Data */}
         
            <div className='text-white grid lg:grid-cols-3 grid-cols-1   m-3'>
              {selectedItem.map(item => <div>

                {/* Create The Table Title */}
                <label className='text-2xl text-green-700 '>
                  {Result.some(i => i[4] === item) && item}
                </label>
                {/* Create Table  */}

                {Result.some(i => i[4] === item) &&
                  (<table border="1">
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Start</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>End</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Duration</th>

                      </tr>
                    </thead>
                    <tbody>
                      {Result.map((name, index) => (
                        (item == name[4]) && <tr key={index}>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{name[0]}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{name[1]}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{name[2]}</td>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{name[3]}</td>


                        </tr>


                      ))}
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }} colSpan="3">Totlal</td>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{
                          Result
                            .filter(j => j[4] === item)
                            .reduce((sum, j) => sum + parseInt(j[3], 10), 0)

                        }</td>
                      </tr>
                    </tbody>
                  </table>)}
              </div>)}
            </div>

          </div>
    </>
  )
}

export default Rawdata

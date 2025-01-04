import React, { useEffect } from 'react'

const Rawdata = ({TableData,Tableoption}) => {
  useEffect(()=>{
    console.log(TableData);
  },[])
  return (
    <>

<div>
            {/* Display Row Data */}
      {(Tableoption.length==0)?<div className='mt-[80px] text-white'>No data Previwes</div>:
            <div className='text-white grid lg:grid-cols-3 grid-cols-1   m-3'>
              {Tableoption.map(item => <div>

                {/* Create The Table Title */}
                <label className='text-2xl text-green-700 '>
                  {TableData.some(i => i[4] === item) && item}
                </label>
                {/* Create Table  */}

                {TableData.some(i => i[4] === item) &&
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
                      {TableData.map((name, index) => (
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
                          TableData
                            .filter(j => j[4] === item)
                            .reduce((sum, j) => sum + parseInt(j[3], 10), 0)

                        }</td>
                      </tr>
                    </tbody>
                  </table>)}
              </div>)}
            </div>
}
          </div>
                      
    </>
  )
}

export default Rawdata

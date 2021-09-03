import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading , setLoading] = useState(true)
  const [jobs , setJobs] = useState([])
  const [value , setValue] = useState(0)
//hre we will fetch our data
  const fetchJobs = async () => {
    const response = await fetch(url)
    const newJobs = await response.json()
    setJobs(newJobs)
    setLoading(false)

    //console.log(newJobs)
  }
  useEffect (()=>{
    fetchJobs()     
  },[]);
  if (loading){
    return(
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  //here we will display our data after loading not before loading
  const { company , dates , duties , title } = jobs[value]//here we get the first item
  return (
    <section className='section'>
      <div className='title'>
        <h2>experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/*btn container */}
        <div className='btn-container'>
          {/*we will iterate over jobs and through each job we will display specific btn  */ }
          {jobs.map((item,index) =>{ {/**we will make onClick so that the moment we click on the button then we will grap index 
          which index is essencially give us the individual item in the jobs list because once we click on the btn we will change the 'value' state
        and then the data will change */}
            return <button
             key={item.id} 
             onClick={()=>{
              setValue(index)
            }}
            className={`job-btn ${index === value && 'active-btn'}`}
            >{item.company}</button>
          })}

        </div>
        {/*jobs info */}
        <article className='jobs-info'>
          <h3>{title}</h3>
          <h4>{company} </h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty,index) => {
            return <div key={index} className='job-desc'>
              <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
              <p>{duty}</p>
            </div>

          })}
        </article>

      </div>

    </section>
  )
}

export default App

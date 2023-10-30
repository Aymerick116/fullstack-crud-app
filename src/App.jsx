import { useEffect } from 'react'
import { useState } from 'react'
import {supabase} from './Client'
import './App.css'

function App() {

  const [crewmates, SetCrewmates] = useState([])
  const [crewmateData, setCrewmateData] = useState({ name:'',speed:'',color:''})
  const [crewmateData2, setCrewmateData2] = useState({ id:'',name:'',speed:'',color:''})


  useEffect(()=>{
    fetchCrewmates()


  },[])


  async function fetchCrewmates(){
    const {data} = await supabase.from('crewmate').select('*');
    SetCrewmates(data);
    //console.log(data)
  }

  //This function will handle for when the user inputs are changing. it's responsive to changes
  const handleChange = (event) => {
    setCrewmateData(prevFormData=>{return{
      ...prevFormData, [event.target.name]:event.target.value
    }})

  };

  const handleChange2 = (event) => {
    setCrewmateData2(prevFormData=>{return{
      ...prevFormData, [event.target.name]:event.target.value
    }})
    
  };


 

//Inserting the data into the table. Making a POST request
 async function createCrewmate(){
     await supabase
    .from('crewmate')
    .insert({ name: crewmateData.name, speed: crewmateData.speed, color: crewmateData.color })
    
 }

 async function deleteCrewmate(id){
     const{data,error} = await supabase
    .from('crewmate')
    .delete()
    .eq('id', id)

    fetchCrewmates();//refreshes the page

  if (error){
    console.log(error)
  }
  if (data){
  console.log(data)
  }
  
 }


 function displayCrewmate(userID){
  
  crewmates.map((crewmate)=>{

    if(crewmate.id ==userID){
      setCrewmateData2({ id: crewmate.id, name: crewmate.name, speed: crewmate.speed, color: crewmate.color })
    }
  })
 }

 console.log(crewmateData2)


 async function updateCrewmate(id){

  const { data,error } = await supabase
  .from('crewmate')
  .update({  name: crewmateData2.name, speed: crewmateData2.speed, color: crewmateData2.color })
  .eq('id', id)

  fetchCrewmates();

  if (error){
    console.log(error)
  }
  if (data){
  console.log(data)
  }
  




 }





  return (
    <>
    {/* FORM 1*/}
    <form onSubmit={createCrewmate}>
      <input type="text"
      placeholder='Name' 
      name='name'
      onChange={handleChange}
      />

      <input type="number"
      placeholder='Enter a number' 
      name='speed'
      onChange={handleChange}
      />

      <input type="text"
      placeholder='Enter a Color' 
      name='color'
      onChange={handleChange}
      />


      <button  className="p-2 bg-blue-500 text-white rounded-md m-3" type='submit'> Create Crewmate</button>

    </form>

      {/* FORM 2*/}
    <form onSubmit={()=>updateCrewmate(crewmateData2.id)}>
      <input type="text"
      placeholder='Name' 
      name='name'
      onChange={handleChange2}
      defaultValue={crewmateData2.name}
      />

      <input type="number"
      placeholder='Enter a number' 
      name='speed'
      onChange={handleChange2}
      defaultValue={crewmateData2.speed}
      />

      <input type="text"
      placeholder='Enter a Color' 
      name='color'
      onChange={handleChange2}
      defaultValue={crewmateData2.color}
      />


      <button  className="p-2 bg-blue-500 text-white rounded-md" type='submit'> Save Changes</button>

    </form>




    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Speed</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        { crewmates.map((crewmate)=>
        <tr key={crewmate.id}>
          <td>{crewmate.id}</td>
          <td>{crewmate.name}</td>
          <td>{crewmate.speed}</td>
          <td>{crewmate.color}</td>
          <td >
            <button  className="p-2 m-3 bg-blue-500 text-white rounded-md" onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
            <button  className="p-2 bg-blue-500 text-white rounded-md"  onClick={() => displayCrewmate(crewmate.id)}>Edit</button>
          </td>
        </tr>
        
        )}
      </tbody>
    </table>

       
    </>
  )
}

export default App

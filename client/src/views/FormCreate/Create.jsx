import {useEffect, useState} from 'react';
import axios from 'axios';
import '../FormCreate/CreateStyle.css';


const Create = () => {

  const [formValues, setFormValues] = useState({
    frmName:'',
    frmImg:'',
    frmMinHeight:'',
    frmMaxHeight:'',
    frmMinWeight:'',
    frmMaxWeight:'',
    frmLifeSpan:'',
    frmTemperament:''
  });

  const [added, setAdded] = useState(false);
  const [created, setCreated]= useState(true);
  const [temperaments, setTemperaments] = useState(null)

  useEffect(()=>{

    //dispatch(getTemperaments())
    axios.get('http://localhost:3001/temperaments')
    .then((response)=>{
      setTemperaments(response.data)
    })

  }, []);

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
  };



  const handleSubmit = async (e)=>{
    e.preventDefault();

    //validaciones
    // 1 que vengan todos los capos 
    // imagen no se valida ya que la url puede tener cualquier letra, nemuro o caracter especial
    if(
      !formValues.frmName ||
      !formValues.frmImg ||
      !formValues.frmMinHeight ||
      !formValues.frmMaxHeight ||
      !formValues.frmMinWeight ||
      !formValues.frmMaxWeight ||
      !formValues.frmLifeSpan
    ){
      alert("All fields are required");
      return;
    };

    // 2 name puede ser solo letras

    let pattern = new RegExp(/^[A-Za-z\s]+$/g);
    if(!pattern.test(formValues.frmName)){

      alert("Name field accept only letters");
      return;
    }

    // 3 todas las medidas y años de vida deben ser numeros

    pattern = new RegExp("^[0-9]+$");
    if(
      !pattern.test(formValues.frmMinHeight) ||
      !pattern.test(formValues.frmMaxHeight) ||
      !pattern.test(formValues.frmMinWeight) ||
      !pattern.test(formValues.frmMaxWeight) ||
      !pattern.test(formValues.frmLifeSpan)
    ){
      alert("fields Minimum height, Maximun height, Minimun weight, Maximun weight, Life span accept only Numbers");
      return;
    }

    // 

    

    try {

      let newBreed = {

        image: formValues.frmImg,
        name: formValues.frmName,
        height:`${formValues.frmMinHeight} - ${formValues.frmMaxHeight}`,
        weight:`${formValues.frmMinWeight} - ${formValues.frmMaxWeight}` ,
        life_span: formValues.frmLifeSpan,
        temperament: [formValues.frmTemperament]
      };

      const resp = await axios.post('http://localhost:3001/dogs/', newBreed);

      if(resp){
        setAdded(true);
        setCreated(false);
      } else{
        console.log('breed could not be created');
      }
      
    } catch (error) {
      console.log(error)
    }


  }



  return ( 
    <div >

      <form className='formCreate' name='form' onSubmit={handleSubmit}>

        {/* Agregar imagen en formulario */}
        <label className='label'>
          Imagen:
          <input
            type='text'
            name='frmImg'
            value={setFormValues.frmImg}
            onChange={handleInputChange}
            placeholder='URL of imagen'
          />
        </label>
        <br/>

        {/* Agregar nombre en formulario */}
        <label className='label'>
          Name:
          <input
            type='text'
            name='frmName'
            value={setFormValues.frmName}
            onChange={handleInputChange}
          />
        </label>
        <br/>

        {/* Agregar altura minima en formulario */}
        <label className='label'>
          Minimum height:
          <input
            type='text'
            name='frmMinHeight'
            value={setFormValues.frmMinHeight}
            onChange={handleInputChange}
          />
        </label>
        <br/>

        {/* Agregar altura maxima en formulario */}
        <label className='label'>
          Maximun height:
          <input
            type='text'
            name='frmMaxHeight'
            value={setFormValues.frmMaxHeight}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        
        {/* Agregar peso minimo en formulario */}
        <label className='label'>
          Minimun weight:
          <input
            type='text'
            name='frmMinWeight'
            value={setFormValues.frmMinWeight}
            onChange={handleInputChange}
          />
        </label>
        <br/>

        {/* Agregar peso maximo en formulario */}
        <label className='label'>
          Maximun weight:
          <input
            type='text'
            name='frmMaxWeight'
            value={setFormValues.frmMaxWeight}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        
        {/* Agregar anios de vida en formulario */}
        <label className='label'>
          Life span:
          <input
            type='text'
            name='frmLifeSpan'
            value={setFormValues.frmLifeSpan}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        
        {/* Agregar temperaments de vida en formulario */}
        <label className='label'>
          Temperaments:
          <select
            name='frmTemperament'
            onChange={handleInputChange}
          >
            {
              temperaments?.map(temp => <option value={temp.name}>{temp.name}</option>)
            }
          </select>
        </label>
        <br/>

        {/* Send post request */}
        <button type="submit"  > Create breed </button>
      </form>
    </div>
  )
}

export default Create;
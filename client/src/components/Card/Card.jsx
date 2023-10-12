import '../Card/CardStyle.css';
import { useNavigate} from 'react-router-dom';

const Card = ({ id, name, reference_image_id, temperament, weight }) => {
  const replaceUrl = (event) => {
    const newUrl = event.target.src.replace('jpg', 'png')
    event.target.src = newUrl
  };

  const navigate = useNavigate()
  const test = (id)=>{
    navigate(`/Detail/${id}`)
  }

  return (
    <div className='Card-contenedor' onClick={()=>test(id)} >
      <h2>{ name }</h2>
      <img
        src={ `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg` }
        alt="Reference image"
        className='image'
        //onError={() => replaceUrl(event)}
      />
      <h4>{ temperament }</h4>
      <h5>{ weight.imperial || weight }</h5>
    </div>
  )
}

export default Card;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getDetail } from '../../redux/action/action';

const Detail = () => {
  const {id} = useParams();

  const dispatch = useDispatch();
  const {detail} = useSelector(state => state)

  useEffect( () => {
      
      dispatch(getDetail(id))
  }, [id]);

  const replaceUrl = (event) => {
    const newUrl = event.target.src.replace('jpg', 'png')
    event.target.src = newUrl
  };

  const navigate = useNavigate()
  const test = (id)=>{
    navigate(`/Detail/${id}`)
  }
 

  return (
    <div onClick={()=>test(reference_image_id)}>

      <img 
      src={ `https://cdn2.thedogapi.com/images/${detail.reference_image_id}.jpg` && `https://cdn2.thedogapi.com/images/${detail.reference_image_id}.jpg`} 
      alt={detail.name} 
      //onError={() => replaceUrl(event)} 
      />
      <h2>Name: {detail.name && detail.name }</h2>
      <h2>Height: {detail.height?.metric && detail.height?.metric}</h2>
      <h2>Weight: {detail.weight?.metric && detail.weight?.metric}</h2>
      <h2>Temperament: {detail.temperament && detail.temperament}</h2>
      <h2>Life span: {detail.life_span} </h2>
      
    </div>
  )
}

export default Detail;
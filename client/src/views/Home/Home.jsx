import '../Home/HomeStyle.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import {useDispatch, useSelector} from 'react-redux'
import { getBreeds } from '../../redux/action/action';

function Home() {
  // 1. Get perros desde API
  // 1.1 Definir en dónde vamos a guardar la información

  const dispatch = useDispatch();
  const {breeds} = useSelector(state => state)

  useEffect(() => {

    dispatch(getBreeds())

  }, [])

  return (
    <div className='cards-wrapper'>
      {breeds.map((breed) => (
          <Card key={`key-${breed.id}`} id={breed.id} name={breed.name} reference_image_id={breed.reference_image_id} temperament={breed.temperament} weight={breed.weight} />
        )
      )}
    </div>
  )
}

export default Home;
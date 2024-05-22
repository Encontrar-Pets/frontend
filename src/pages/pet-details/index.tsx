import React from 'react';
import { useLocation } from 'react-router-dom';

import Tag from "components/tag";
import Button from "components/button";
import BackButton from 'components/back-button';

import { useNavigate } from "react-router-dom";

export default function PetDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, img_url, description } = location.state.pet

  const tmpTags = ['Caramelo', 'Bafudo', 'Comedor de Parachoque', 'Caramelo', 'Bafudo', 'Comedor de Parachoque'];

  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col max-w-96">
        <div className='mb-2'>
          <BackButton
            onClick={() => window.location.href = '/find-pet'}
          />
        </div>
        <img className="flex rounded-t-lg w-full" src={`data:image/png;base64,${img_url}`} alt={name} style={{ width: '100%', height: 300 }} />

        <h1 className="self-start ml-2 mt-1 text-lg font-semibold text-gray-700">{name}</h1>
        <span className="self-start ml-2 text-sm mb-2 text-primary-gray">{description}</span>

        <div>
          {
            tmpTags.map((tag: any, index) => (
              <Tag className='mt-2' key={index} id={tag.id} description={tag} />
            ))
          }
        </div>

        <Button
          className='mt-8'
          label='Quero recuperar meu pet'
          onClick={() => navigate('/recover-pet')}
        />

        <Button
          label='Quero ser lar temporário'
          onClick={() => { }}
          variant='secondary'
        />
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";

import Tag from "components/tag";
import Button from "components/button";
import BackButton from 'components/back-button';
import useApi from 'hooks/api';
import { useLoading } from "context/loadingContext";

import { useNavigate, useParams } from "react-router-dom";

export default function PetDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const [pet, setPet] = useState(location?.state?.pet);

  const serviceGetPet = useApi("coreServer", 'GET', '', {});

  useEffect(() => {
    (async () => {
      if (id && !pet) {
        showLoading();
        const response = await serviceGetPet.fetch({ dynamicRoutes: `pets/details?_id=${id}` });
        if (response) setPet(response.data);
        hideLoading();
      }
    })()
  }, [id]);

  const generateGoogleMapsLink = (address: string) => {
    const baseUrl = "https://www.google.com/maps/dir/?api=1&destination=";
    const encodedAddress = encodeURIComponent(address);
    return `${baseUrl}${encodedAddress}`;
  };

  const shareGpsRoute = () => {
    const address = pet?.shelters?.address;
    if (address) {
      const mapsLink = generateGoogleMapsLink(address);
      window.open(mapsLink, '_blank');
    } else {
      alert("Endereço não disponível");
    }
  };

  return (
    <div className='flex w-full justify-center px-4'>
      <div className="flex flex-col w-full max-w-96">
        <div className='mb-2'>
          <BackButton
            onClick={() => navigate('/find-pet')}
          />
        </div>

        <h1 className="self-start  mt-1 text-lg font-semibold text-gray-700">{pet?.name}</h1>
        <span className="self-start text-sm mb-2 text-primary-gray">{pet?.description}</span>

        <img className="flex rounded-lg w-full" src={`data:image/png;base64,${pet?.img_url}`} alt={pet?.name} style={{ width: '100%', height: 300 }} />

        <div>
          {
            pet?.tags?.map((tag: { id: string, description: string }) => (
              <Tag className='mt-2' key={tag?.id} id={tag?.id} description={tag?.description} />
            ))
          }
        </div>

        <h2 className="self-start mt-3 text-lg font-semibold text-gray-700">{pet?.shelters?.name}</h2>
        <button className='flex flex-row items-center' onClick={shareGpsRoute}>
          <SlLocationPin className='text-primary-gray' />
          <span className="ml-1 self-start text-sm text-primary-gray">{pet?.shelters?.address}</span>
        </button>

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
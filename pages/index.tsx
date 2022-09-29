import type { NextPage } from 'next';
import { useEffect } from 'react';
import PlantLayout from '../components/plant-layout/plant-layout';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { getPlants } from '../shared/store/services/plant.service';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { plants, searchTerm } = useAppSelector((state) => state.plants);
  const plants$ = plants.filter((plant) => {
    return (
      !plant.isFavorite &&
      (plant.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
        plant.description
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()))
    );
  });

  useEffect(() => {
    dispatch(getPlants());
  }, [getPlants]);

  return <PlantLayout plants={plants$} />;
};

export default Home;

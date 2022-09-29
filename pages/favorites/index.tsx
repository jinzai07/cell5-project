import type { NextPage } from 'next';
import PlantLayout from '../../components/plant-layout/plant-layout';
import { useAppSelector } from '../../shared/store/hooks';

const Favorites: NextPage = () => {
  const { plants, searchTerm } = useAppSelector((state) => state.plants);
  const plants$ = plants.filter((plant) => {
    return (
      plant.isFavorite &&
      (plant.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
        plant.description
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()))
    );
  });

  return <PlantLayout plants={plants$} />;
};

export default Favorites;

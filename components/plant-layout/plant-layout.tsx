import { useEffect } from 'react';
import { Plant } from '../../shared/interfaces/plant.model';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { getPlants } from '../../shared/store/services/plant.service';
import PlantCard from '../card/card';

type PlantLayoutProps = {
  plants: Plant[];
};
const PlantLayout = (props: PlantLayoutProps) => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector((state) => state.plants).pending;

  useEffect(() => {
    dispatch(getPlants());
  }, [getPlants]);

  return (
    <>
      {isFetching ? (
        <div className="mt-24 flex justify-center">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {!isFetching && props.plants.length > 0 ? (
            props.plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))
          ) : (
            <div>
              <h1 className="text-2xl font-bold mt-24">No Favorite plants, add one!</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PlantLayout;

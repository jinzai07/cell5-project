import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import CreateUpdate from '../create-update/create-update';
import { useState } from 'react';
import { Action } from '../../shared/enums/action';
import { Plant } from '../../shared/interfaces/plant.model';
import { useAppDispatch } from '../../shared/store/hooks';
import { removePlant } from '../../shared/store/services/plant.service';

type PlantCardProps = {
  plant: Plant;
};
const PlantCard = (props: PlantCardProps) => {
  const [isOpenModal, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const onDeleteHandler = () => {
    if (confirm('Are you sure you want to delete this plant?')) {
      dispatch(removePlant(props.plant._id))
    }
  }

  return (
    <>
      <section className="border-4 border-emerald-300 m-4 rounded-2xl shadow-md max-w-md">
        <div className="flex justify-end p-4">
          <button onClick={() => setModalOpen(true)}>
            <FontAwesomeIcon
              icon={faEdit}
              className="text-emerald-800 text-2xl hover:scale-110"
            />
          </button>
          <button onClick={onDeleteHandler}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="text-red-600 text-2xl ml-4 hover:scale-110"
            />
          </button>
        </div>
        <div className=" p-8">
          <div className="border-4 rounded-2xl border-white p-2 mb-8">
            <Image src="/vercel.svg" alt="sample" width={400} height={400} />
          </div>
          <h1>
            Name: <span className="font-bold">{props.plant.name}</span>
          </h1>
          <p>
            Description: <span>{props.plant.description}</span>
          </p>
        </div>
      </section>
      <CreateUpdate
        isOpenModal={isOpenModal}
        setModalOpen={setModalOpen}
        action={Action.UPDATE}
        plant={props.plant}
      />
    </>
  );
};

export default PlantCard;

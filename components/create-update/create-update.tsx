import { Dispatch, SetStateAction, useRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalDefaulStyle } from '../../shared/utils/modal.config';
import { Action } from '../../shared/enums/action';
import { Plant } from '../../shared/interfaces/plant.model';
import { useAppDispatch } from '../../shared/store/hooks';
import {
  addPlant,
  updatePlant,
} from '../../shared/store/services/plant.service';

Modal.setAppElement('#__next');

type NavbarProps = {
  isOpenModal: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  action: Action;
  plant?: Plant;
};
const CreateUpdate = (props: NavbarProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const isFavoriteRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onCreateUpdatePlant = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const desc = descRef.current?.value;
    const isFavorite = isFavoriteRef.current?.checked ?? false;

    if (!name || !desc) {
      return alert(`Please put value for name or description!`);
    }

    const payload = {
      name,
      description: desc,
      isFavorite,
    };
    const confirmMessage = `Confirm ${
      props.action === Action.CREATE ? 'adding new' : 'updating'
    } plant?`;

    if (!confirm(confirmMessage)) {
      return;
    }
    switch (props.action) {
      case Action.CREATE:
        dispatch(addPlant(payload as Plant));
        break;

      case Action.UPDATE:
        dispatch(updatePlant({ ...payload, _id: props.plant?._id as string }));

        break;

      default:
        break;
    }

    props.setModalOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={props.isOpenModal}
        style={modalDefaulStyle}
        onRequestClose={() => props.setModalOpen(false)}
      >
        <div className="flex justify-end">
          <button className="ml-auto" onClick={() => props.setModalOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="text-red-600 text-3xl" />
          </button>
        </div>
        <form>
          <div className="py-2">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              defaultValue={props.plant?.name}
              placeholder="Add a name..."
              className="border-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl p-2 outline-none"
            />
          </div>
          <div className="py-2">
            <label htmlFor="desc" className="block">
              Description:{' '}
            </label>
            <textarea
              ref={descRef}
              id="desc"
              name="desc"
              cols={50}
              rows={5}
              defaultValue={props.plant?.description}
              className="border-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl p-2 outline-none"
            ></textarea>
          </div>
          <div className="py-2">
            <label htmlFor="desc">Favorite: </label>
            <input
              ref={isFavoriteRef}
              defaultChecked={props.plant?.isFavorite}
              type="checkbox"
              name="favorite"
              id="favorite"
              className="ml-2"
            />
          </div>
          <button
            className="p-2 bg-emerald-700 rounded-full hover:text-emerald-800 text-white ml-auto block mt-4"
            onClick={(event) => onCreateUpdatePlant(event)}
          >
            <span className="px-4 text-lg font-bold ">
              {props.action === Action.CREATE ? 'Create' : 'Update'} Plant
            </span>
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateUpdate;

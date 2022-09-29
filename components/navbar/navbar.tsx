import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Action } from '../../shared/enums/action';
import CreateUpdate from '../create-update/create-update';

const Navbar = () => {
  const router = useRouter();
  const [isOpenModal, setModalOpen] = useState(false);

  return (
    <>
      <section className="p-4 bg-emerald-500 text-white">
        <ul className="flex items-center flex-wrap">
          <li
            className={`mx-4 text-lg font-bold hover:text-emerald-800 ${
              router.pathname == '/' ? 'text-emerald-800' : ''
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`mx-4 text-lg font-bold hover:text-emerald-800 ${
              router.pathname == '/favorites' ? 'text-emerald-800' : ''
            }`}
          >
            <Link href="/favorites">Favorites</Link>
          </li>
          <li className="mx-4 text-lg font-bold ml-auto">
            <button className="p-2 bg-emerald-700 rounded-full hover:text-emerald-800">
              <span className="px-4" onClick={() => setModalOpen(true)}>
                Add Plant
              </span>
            </button>
          </li>
        </ul>
      </section>
      <CreateUpdate
        isOpenModal={isOpenModal}
        setModalOpen={setModalOpen}
        action={Action.CREATE}
      />
    </>
  );
};

export default Navbar;

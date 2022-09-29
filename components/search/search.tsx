import { ChangeEvent } from "react";
import { useAppDispatch } from "../../shared/store/hooks";
import { setFilterByTerm } from "../../shared/store/slices/plant.slice";
import styles from './search.module.css';

const Search = () => {
  const dispatch = useAppDispatch();

  const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputtedText = event.target.value;

    dispatch(setFilterByTerm(inputtedText));
  }
  return (
    <>
      <section className="mt-4 mb-8">
        <div className="rounded-full bg-emerald-300 flex justify-center p-4 max-w-2xl m-auto">
          <input
            type="text"
            placeholder="Search for name or description..."
            className={'border-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl p-2 outline-none ' + styles.input}
            onChange={(event) => onSearchHandler(event)}
          />
        </div>
      </section>
    </>
  );
};

export default Search;

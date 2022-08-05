import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setSearch } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {

  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    dispatch(setSearch(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        placeholder="Поиск пиццы..."
        className={styles.input_search}
        value={value}
        onChange={onChangeInput}
      />
      <svg
        className={styles.clear}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClear}
      >
        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
      </svg>
    </div>
  )
}

export default Search;
import { useDispatch } from 'react-redux';
import { search } from '../features/search';
import { useState, useEffect } from 'react';
import { AppDispatch } from '../store/store';

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(search({ term: searchTerm }));
  }, [searchTerm, dispatch])

  const handleClearAll = () => {
    setSearchTerm('');
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="text" className="w-full py-1.5 px-3 focus:outline-none" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      <div>
        <button className="py-2 bg-[#dbdbdb] hover:bg-[#d2d2d2] w-full" onClick={handleClearAll}>Clear All</button>
      </div>
    </div>
  )
}

export default SearchBar;
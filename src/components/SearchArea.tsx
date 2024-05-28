import { useProgressContext } from "../hooks/useProgressContext";

const SearchArea = () => {
  const { setSearch, search, selectedList, setSelectedList, setShowDropdown } = useProgressContext();

  return (
    <div
      onClick={() => setShowDropdown(true)}
      className="flex border-2 rounded-xl w-full xl:w-1/2 shadow-md flex-wrap p-2 gap-2"
    >
      {selectedList.map((c) => {
        return (
          <div className="bg-slate-200 flex items-center gap-2 p-2 rounded-lg">
            <p>{c.name}</p>
            <button
              className="bg-slate-500 text-white w-6 h-6 rounded-md"
              onClick={() => setSelectedList(selectedList.filter((x) => x.id !== c.id))}
            >
              X
            </button>
          </div>
        );
      })}

      <input
        type="text"
        className="flex flex-1 outline-none p-2 rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchArea;

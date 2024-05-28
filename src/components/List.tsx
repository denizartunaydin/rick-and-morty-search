import { useEffect } from "react";
import { useProgressContext } from "../hooks/useProgressContext";
import LoadingArea from "./LoadingArea";

const List = () => {
  const { search, selectedList, setSelectedList, list, getList, showDropdown, isLoading } = useProgressContext();

  useEffect(() => {
    getList();
  }, []);

  const filterData = list.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));

  return isLoading ? (
    <LoadingArea />
  ) : showDropdown ? (
    filterData.length === 0 ? (
      <div className="flex flex-col w-full xl:w-1/2  border-2 rounded-xl overflow-y-auto max-h-96 items-center justify-center py-2">
        Kayıt Bulunamadı
      </div>
    ) : (
      <div className="flex flex-col w-full xl:w-1/2  border-2 rounded-xl overflow-y-auto max-h-96">
        {filterData.map((c, i) => {
          const parts = c.name.split(new RegExp(`(${search})`, "gi"));

          const isChecked = selectedList.findIndex((x) => x.id === c.id) !== -1;

          return (
            <div
              className="[&:not(:last-child)]:border-b-2 p-4 flex gap-2 cursor-pointer hover:bg-slate-50"
              key={i}
              onClick={() => {
                setSelectedList(isChecked ? selectedList.filter((x) => x.id !== c.id) : [...selectedList, ...[c]]);
              }}
            >
              <input type="checkbox" checked={isChecked} />
              <img src={c.image} className="w-12 h-12 rounded-md" />

              <div className="flex flex-col">
                <div>
                  {parts.map((part, index) =>
                    part.toLowerCase() === search?.toLowerCase() ? <b key={index}>{part}</b> : part
                  )}
                </div>

                <span className="text-sm opacity-50">{c.episode?.length ?? 0} Episodes</span>
              </div>
            </div>
          );
        })}
      </div>
    )
  ) : (
    <></>
  );
};

export default List;

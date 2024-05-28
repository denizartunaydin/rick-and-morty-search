import { Character } from "../types/list";

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface IProgressValueProps {
  isLoading: boolean;
  list: Character[];
  selectedList: Character[];
  search: string;
  showDropdown: boolean;
}

export type IProgressContextValue = IProgressValueProps & {
  setLoading: (payload: boolean) => void;
  setSelectedList: (payload: Character[]) => void;
  setSearch: (payload: string) => void;
  setShowDropdown: (payload: boolean) => void;
  getList: () => void;
};

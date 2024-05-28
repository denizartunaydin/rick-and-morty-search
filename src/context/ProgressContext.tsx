import axios from "axios";
import { createContext, useReducer } from "react";

import { Character } from "../types/list";
import { ActionMapType, IProgressContextValue, IProgressValueProps } from "./types";

const initialState: IProgressValueProps = {
  isLoading: false,
  list: [],
  selectedList: [],
  search: "",
  showDropdown: false,
};

enum Types {
  SET_LOADING = "SET_LOADING",
  SET_LIST = "SET_LIST",
  SET_SELECTED_LIST = "SET_SELECTED_LIST",
  SET_SEARCH = "SET_SEARCH",
  SET_SHOW_DROPDOWN = "SET_SHOW_DROPDOWN",
}

type Payload = {
  [Types.SET_LOADING]: {
    isLoading: boolean;
  };
  [Types.SET_LIST]: {
    list: Character[];
  };
  [Types.SET_SELECTED_LIST]: {
    selectedList: Character[];
  };
  [Types.SET_SEARCH]: {
    search: string;
  };
  [Types.SET_SHOW_DROPDOWN]: {
    showDropdown: boolean;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const reducer = (state: IProgressValueProps, action: ActionsType) => {
  if (action.type === Types.SET_LOADING) {
    return {
      ...state,
      isLoading: action.payload.isLoading,
    };
  }

  if (action.type === Types.SET_LIST) {
    return {
      ...state,
      list: action.payload.list,
    };
  }

  if (action.type === Types.SET_SELECTED_LIST) {
    return {
      ...state,
      selectedList: action.payload.selectedList,
    };
  }

  if (action.type === Types.SET_SEARCH) {
    return {
      ...state,

      search: action.payload.search,
    };
  }

  if (action.type === Types.SET_SHOW_DROPDOWN) {
    return {
      ...state,

      showDropdown: action.payload.showDropdown,
    };
  }

  return state;
};

export const ProgressContext = createContext<IProgressContextValue | null>(null);

type IProgressProviderProps = {
  children: React.ReactNode;
};

const ProgressProvider = ({ children }: IProgressProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = async (paylaod: boolean) => {
    dispatch({
      type: Types.SET_LOADING,
      payload: {
        isLoading: paylaod,
      },
    });
  };

  const setSelectedList = async (paylaod: Character[]) => {
    dispatch({
      type: Types.SET_SELECTED_LIST,
      payload: {
        selectedList: paylaod,
      },
    });
  };

  const setSearch = async (paylaod: string) => {
    dispatch({
      type: Types.SET_SEARCH,
      payload: {
        search: paylaod,
      },
    });

    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character`, {
        params: {
          name: paylaod,
        },
      });

      dispatch({
        type: Types.SET_LIST,
        payload: {
          list: res.data.results,
        },
      });
    } catch (error) {
      dispatch({
        type: Types.SET_LIST,
        payload: {
          list: [],
        },
      });
    }
  };

  const getList = async () => {
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character`);

      dispatch({
        type: Types.SET_LIST,
        payload: {
          list: res.data.results,
        },
      });
    } catch (error) {
      dispatch({
        type: Types.SET_LIST,
        payload: {
          list: [],
        },
      });
    }
  };

  const setShowDropdown = async (paylaod: boolean) => {
    dispatch({
      type: Types.SET_SHOW_DROPDOWN,
      payload: {
        showDropdown: paylaod,
      },
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        setLoading,
        setSelectedList,
        setSearch,
        getList,
        setShowDropdown,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressProvider;

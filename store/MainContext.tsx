import { LinkItem } from "@/types";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";

enum ActionKind {
  RETRIEVE_DATA = "RETRIEVE_DATA",
  SET_LINK_ITEM = "SET_LINK_ITEM",
}

type ACTIONTYPE =
  | {
      type: ActionKind.RETRIEVE_DATA;
      isLoading?: boolean;
      dataLink: LinkItem;
    }
  | {
      type: ActionKind.SET_LINK_ITEM;
      isLoading?: boolean;
      dataLink: LinkItem;
    };

interface State {
  isLoading: boolean;
  dataLink: LinkItem;
  setLinkItem: (data: LinkItem) => void;
}

interface Props {
  children: React.ReactNode;
}

const initialDataLink: LinkItem = {
  name: "",
  link: "",
};

const initialState: State = {
  isLoading: true,
  dataLink: initialDataLink,
  setLinkItem: () => {},
};

export const MainContext = createContext<State>(initialState);

const mainReducer = (prevState: State, action: ACTIONTYPE) => {
  switch (action.type) {
    case ActionKind.RETRIEVE_DATA:
      return {
        ...prevState,
        dataLink: action.dataLink,
        isLoading: false,
      };
    case ActionKind.SET_LINK_ITEM:
      return {
        ...prevState,
        dataLink: action.dataLink,
        isLoading: false,
      };
    default:
      return {
        ...prevState,
        isLoading: false,
      };
  }
};

const ContextProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    const getInitialData = () => {
      dispatch({
        type: ActionKind.RETRIEVE_DATA,
        dataLink: initialDataLink,
      });
    };

    getInitialData();
  }, []);

  const setLinkItem = useCallback((data: LinkItem) => {
    dispatch({
      type: ActionKind.SET_LINK_ITEM,
      dataLink: data,
    });
  }, []);

  return (
    <MainContext.Provider
      value={{
        ...state,
        setLinkItem,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;

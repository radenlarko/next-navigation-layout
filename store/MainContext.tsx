import { LinkItem } from "@/types";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";

enum ActionKind {
  RETRIEVE_DATA = "RETRIEVE_DATA",
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
  SET_LINK_ITEM = "SET_LINK_ITEM",
  SET_SCROLL_ACTIVE = "SET_SCROLL_ACTIVE",
}

enum StorageKind {
  username = "username",
}

type ACTIONTYPE =
  | {
      type: ActionKind.RETRIEVE_DATA;
      isLoading?: boolean;
      username: string;
    }
  | {
      type: ActionKind.LOG_IN;
      isLoading?: boolean;
      username: string;
    }
  | {
      type: ActionKind.LOG_OUT;
      isLoading?: boolean;
      username?: string;
    }
  | {
      type: ActionKind.SET_LINK_ITEM;
      isLoading?: boolean;
      dataLink: LinkItem;
    }
  | {
      type: ActionKind.SET_SCROLL_ACTIVE;
      isLoading?: boolean;
      scrollActive: boolean;
    };

interface State {
  isLoading: boolean;
  dataLink: LinkItem;
  scrollActive: boolean;
  username: string;
  signIn: (username: string) => void;
  signOut: () => void;
  setLinkItem: (data: LinkItem) => void;
  setScrollActive: (value: boolean) => void;
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
  scrollActive: false,
  username: "",
  signIn: () => {},
  signOut: () => {},
  setLinkItem: () => {},
  setScrollActive: () => {},
};

export const MainContext = createContext<State>(initialState);

const mainReducer = (prevState: State, action: ACTIONTYPE) => {
  switch (action.type) {
    case ActionKind.RETRIEVE_DATA:
      return {
        ...prevState,
        username: action.username,
        isLoading: false,
      };
    case ActionKind.LOG_IN:
      return {
        ...prevState,
        username: action.username,
        isLoading: false,
      };
    case ActionKind.LOG_OUT:
      return {
        ...prevState,
        username: "",
        isLoading: false,
      };
    case ActionKind.SET_LINK_ITEM:
      return {
        ...prevState,
        dataLink: action.dataLink,
        isLoading: false,
      };
    case ActionKind.SET_SCROLL_ACTIVE:
      return {
        ...prevState,
        scrollActive: action.scrollActive,
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
      const usernameStorage = localStorage.getItem(StorageKind.username);
      const username = usernameStorage === null ? "" : usernameStorage;
      dispatch({
        type: ActionKind.RETRIEVE_DATA,
        username,
      });
    };

    getInitialData();
  }, []);

  const signIn = useCallback((username: string) => {
    localStorage.setItem(StorageKind.username, username);
    dispatch({
      type: ActionKind.LOG_IN,
      username,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(StorageKind.username);
    dispatch({ type: ActionKind.LOG_OUT });
  }, []);

  const setLinkItem = useCallback((data: LinkItem) => {
    dispatch({
      type: ActionKind.SET_LINK_ITEM,
      dataLink: data,
    });
  }, []);

  const setScrollActive = useCallback((value: boolean) => {
    dispatch({
      type: ActionKind.SET_SCROLL_ACTIVE,
      scrollActive: value,
    });
  }, []);

  return (
    <MainContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        setLinkItem,
        setScrollActive,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;

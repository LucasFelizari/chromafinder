import { createContext, ReactNode } from "react";

export type ChromaFinderContextProps = {
 
}

type ChromaFinderProviderProps = {
    children: ReactNode;
}

export const ChromaFinderContext = createContext<ChromaFinderContextProps>({} as ChromaFinderContextProps);

export function ChromaFinderProvider( { children }: ChromaFinderProviderProps ) {
    return (
        <ChromaFinderContext.Provider value={{}}>
            {children}
        </ChromaFinderContext.Provider>
    )
}
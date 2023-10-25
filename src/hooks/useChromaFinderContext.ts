import { useContext } from "react";
import { ChromaFinderContext } from "../contexts/ChromaFinderContext";

export function useChromaFinderContext() {
    const context = useContext(ChromaFinderContext);

    return context;
}
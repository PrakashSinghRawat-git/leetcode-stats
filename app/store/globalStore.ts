import { create } from "zustand";

export interface GroupArrType {
    groupArr: string[];
    setGroupArr: (groupArr: string[]) => void;

    themeMounted: boolean;
    setThemeMounted: (themeMounted: boolean) => void;
}

// Define your store
const globalStore = create<GroupArrType>((set) => ({
    groupArr: [], // Initialize groupArray with an empty array of strings
    setGroupArr: (arr: string[]) => set({ groupArr: arr }), // Define action to set groupArray

    themeMounted: false,
    setThemeMounted: (val: boolean) => set({ themeMounted: val }),
}));

export default globalStore;

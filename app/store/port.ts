import { atom } from "recoil";
export const PortAtom = atom<string>({
    key: "port",
    default: ""
});
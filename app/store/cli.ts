import { CliSchema } from "@/types";
import { atom } from "recoil";
export const ClisAtom = atom<CliSchema[]>({
    key: "clis",
    default: []
});
export const CliAtom = atom<CliSchema>({
    key: "cli",
})
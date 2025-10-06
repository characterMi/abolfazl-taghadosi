import { IsTouchDeviceContext } from "@/providers/ContextProvider";
import { useContext } from "react";

export const useIsTouchDevice = () => useContext(IsTouchDeviceContext);

export type ScaleValues = {
  [index in
    | "scale2"
    | "scale4"
    | "scale5"
    | "scale7"
    | "scale8"
    | "scale9"]: MotionValue<number>;
};

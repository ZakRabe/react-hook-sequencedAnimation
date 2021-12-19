import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { useCallback, useMemo } from "react";

export const useSequencedAnimation = (
  itemCount: number,
  durationSeconds: number,
  keyframes: Record<string, CSSProperties>,
) => {
  // calculate how much % each animation should be of the whole cycle
  const scaleFactor = useMemo(() => 100 / itemCount, [itemCount]);
  // scale the percentages in the raw keyframes
  const scaledKeyframes = useMemo(
    () =>
      Object.keys(keyframes).reduce((acc, key) => {
        let percentNumber;
        switch (key) {
          // treat from as 0%
          case "from":
            percentNumber = 0;
            break;
          // treat to as 100%
          case "to":
            percentNumber = 100;
            break;
          default:
            percentNumber = Number(key.replace("%", ""));
        }

        acc[`${(percentNumber / 100) * scaleFactor}%`] = keyframes[key];
        return acc;
      }, {} as typeof keyframes),
    [keyframes, scaleFactor],
  );

  const getDelay = useCallback(
    (index: number) => {
      return durationSeconds * index;
    },
    [durationSeconds],
  );

  return {
    keyframes: scaledKeyframes,
    duration: durationSeconds * itemCount,
    getDelay,
  };
};

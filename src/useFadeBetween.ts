import { makeStyles, createStyles } from "@material-ui/core";
import { useCallback } from "react";
import { useSequencedAnimation } from "./useSequencedAnimation";

const fadeDurationSeconds = 3;
const fadeKeyframes = {
  "0%": { opacity: 0 },
  // 0 - 0.5 s    Fade in
  "16%": { opacity: 1 },
  // 0.5 - 2.5s   Visible
  "84%": { opacity: 1 },
  // 2.5 - 3s     Fade out
  "100%": { opacity: 0 },
};

export const useFadeBetween = (count: number) => {
  const { keyframes, duration, getDelay } = useSequencedAnimation(
    count,
    fadeDurationSeconds,
    fadeKeyframes,
  );

  const { fade } = makeStyles(() =>
    createStyles({
      [`@keyframes fade`]: keyframes,
      [`fade`]: {
        opacity: 0,
        animation: `$fade ${duration}s linear infinite`,
      },
    }),
  )();

  const getIndexProps = useCallback(
    (index: number) => ({
      className: fade,
      // offset the animation by the marker's index * the animation's duration
      style: { animationDelay: `${getDelay(index)}s` },
    }),
    [fade, getDelay],
  );

  return getIndexProps;
};

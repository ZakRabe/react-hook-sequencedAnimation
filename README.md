# react-hook-sequencedAnimation

I couldn't figure out any way to use a single infinite CSS animation sequentially on multiple elements, using only CSS.   

CSS doesn't support setting a delay between the iterations of an infinite CSS animation.

Since we cant get what we need with CSS, we take the JS approach to scale the original keyframes down to animate one item, then wait for the other items.

## What does this hook do?

useSequencedAnimation accepts CSS-in-JS keyframes for a single animation, a duration for the animnation (D), and the number of items (N) you'd like to use the animation on. 

With this information, the hook creates a new keyframes object, which executes the animation, then "waits" for (D * N-1). 
The hook also returns a helper function to get the full duration of the new animation, and the `animation-delay` property for an item, based on its index.
This gives the effect we want, but actually, we're using `animation-delay` to play a new animation that is (D * N) seconds long after a (D * index) delay.

The nice part is you don't have to do any math to figure out how to transform your initial animation into one that can use this technique. You can define your keyframes for the animation you want to reuse, instead of having to define the transformed keyframes, which can obfusicate the effect you are trying to achieve. 

This repo is a codesandbox.io example of how to use the hook to fade between an array of elements in order. 

## Release?

I will probably clean up this repo to publish the useSequencedAnimation hook, and a few animation hooks using this technique. 

## Demo

https://codesandbox.io/s/github/ZakRabe/react-hook-sequencedAnimation

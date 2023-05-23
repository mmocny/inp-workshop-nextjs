Open [app/page.tsx](./app/page.tsx).

## Steps

* Default demo-- not working search

* Blocking search in event handler

* startTransition()
  * delaying to next frame
  * can update textbox, or, add css effects
  * Still affects interactions, only the very first paint improved

* Add `debounce()` effect to cancel needless search work.

* Once work is started, yield to handle any incoming new interactions quickly.

* Abort needless work to decrease load


## TODO:

* Try a version that leverages Components
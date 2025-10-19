import type { Remix } from '@remix-run/dom';

export function Button(
  this: Remix.Handle,
  props: Remix.Props<'button'> & {
    popovertargetaction?: 'show' | 'hide' | 'toggle';
  },
) {
  return () => <button {...props}></button>;
}

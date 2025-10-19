import type { Remix } from '@remix-run/dom';
import { press } from '@remix-run/events/press';

import { Button } from './button';
import { Popup, PopupProvider } from './popup';

export function App(this: Remix.Handle) {
  return () => (
    <PopupProvider>
      <Main />
    </PopupProvider>
  );
}

function Main(this: Remix.Handle) {
  const popupContext = this.context.get(PopupProvider);

  return () => (
    <main>
      <Button
        type="button"
        css={{ position: 'relative' }}
        on={press(() => popupContext.openPopup())}
      >
        開く
      </Button>

      <Popup />
    </main>
  );
}

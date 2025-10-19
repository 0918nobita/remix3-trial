import { connect, disconnect, type Remix } from '@remix-run/dom';

import { Button } from './button';

export class PopupContext extends EventTarget {
  openPopup() {
    this.dispatchEvent(new Event('popup-open'));
  }
}

export function PopupProvider(this: Remix.Handle<PopupContext>) {
  this.context.set(new PopupContext());

  return ({ children }: { children: Remix.RemixNode }) => children;
}

export function Popup(this: Remix.Handle) {
  const context = this.context.get(PopupProvider);

  let popupEl: HTMLDivElement | null = null;

  const handlePopupOpen = () => {
    popupEl?.showPopover();
  };

  context.addEventListener('popup-open', handlePopupOpen);

  return () => (
    <div
      id="popup"
      popover="manual"
      css={{
        '&:popover-open': {
          position: 'absolute',
          top: 0,
          display: 'flex',
          gap: '8px',
          background: '#ddd',
          padding: '8px 10px',
          border: 'none',
        },
      }}
      on={[
        connect((event) => {
          popupEl = event.currentTarget;
        }),
        disconnect(() => {
          context.removeEventListener('popup-open', handlePopupOpen);
        }),
      ]}
    >
      ポップアップ
      <Button type="button" popovertarget="popup" popovertargetaction="hide">
        閉じる
      </Button>
    </div>
  );
}

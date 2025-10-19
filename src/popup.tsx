import { connect, disconnect, type Remix } from '@remix-run/dom';
import { press } from '@remix-run/events/press';

import { App } from './app';

export function Popup(this: Remix.Handle) {
  const appContext = this.context.get(App);

  return () => (
    <dialog
      open
      on={[
        connect(() => {
          console.log('connect');
        }),
        disconnect(() => {
          console.log('disconnect');
        }),
      ]}
    >
      ポップアップ
      <button type="button" on={press(() => appContext.closePopup())}>
        閉じる
      </button>
    </dialog>
  );
}

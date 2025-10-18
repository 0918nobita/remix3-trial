import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";

import { Popup } from "./popup";

export class AppContext extends EventTarget {
	#isPopupVisible = false;

	get isPopupVisible() {
		return this.#isPopupVisible;
	}

	openPopup() {
		this.#isPopupVisible = true;
		this.dispatchEvent(new CustomEvent("open-popup"));
	}

	closePopup() {
		this.#isPopupVisible = false;
		this.dispatchEvent(new CustomEvent("close-popup"));
	}
}

export function App(this: Remix.Handle<AppContext>) {
	const appContext = new AppContext();

	this.context.set(appContext);

	appContext.addEventListener("open-popup", () => {
		this.update();
	});

	appContext.addEventListener("close-popup", () => {
		this.update();
	});

	return () => (
		<main>
			<button type="button" on={press(() => appContext.openPopup())}>
				フォローする
			</button>
			{appContext.isPopupVisible && <Popup />}
		</main>
	);
}

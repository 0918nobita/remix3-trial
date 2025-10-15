import { createRoot, type Remix } from '@remix-run/dom';

function App(this: Remix.Handle) {
  let count = 0;

  setInterval(() => {
    count++;
    this.update();
  }, 1000);

  // 再レンダリングするときは、↓のアロー関数式の本体が再評価される
  return () => {
    console.log('レンダリングします', count);
    return <p>Count: {count}</p>;
  };
}

createRoot(document.body).render(<App />);

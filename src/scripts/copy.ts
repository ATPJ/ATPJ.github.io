// Copy-to-clipboard buttons with a polite live-region confirmation.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const status = document.querySelector<HTMLElement>('[data-copy-status]');
  let timer: number | undefined;

  const say = (msg: string, state: 'ok' | 'fail') => {
    if (status) status.textContent = msg;
    btn.dataset.state = state;
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (status) status.textContent = '';
      delete btn.dataset.state;
    }, 2600);
  };

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      say(btn.dataset.ok ?? 'Copied', 'ok');
    } catch {
      const target = document.querySelector(btn.dataset.select ?? '');
      if (target) getSelection()?.selectAllChildren(target);
      say(btn.dataset.fail ?? 'Copy failed', 'fail');
    }
  });
});

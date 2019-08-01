import { shell } from 'electron';

export const openLinksExternally = (): void => {
  
  document.addEventListener('click', function (event) {
    let target = event.target as HTMLAnchorElement
    if (target.tagName === 'A' && target.href.startsWith('http')) {
      event.preventDefault();
      shell.openExternal(target.href);
    }
  });
}
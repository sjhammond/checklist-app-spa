import { shell } from 'electron';

export const openLinksExternally = (): void => {
  
  $(document).off().on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
  });
}
import $ from 'jquery';
import { shell } from 'electron';

export const transformLinks = (): void => {
  $(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
  });
}
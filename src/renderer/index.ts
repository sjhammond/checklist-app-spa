import { renderMainMenu } from "./functions/menuBuilder";
import '../../static/css/app.css'

const styles = document.createElement('style');
styles.setAttribute('type', 'text/css');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('href', '../static/css/app.css');

const app = document.getElementById('app');
app.innerHTML = `

    <nav id="menu" class="sidenav"></nav>
    <main id="main-content" class="container"></main>

`
renderMainMenu();
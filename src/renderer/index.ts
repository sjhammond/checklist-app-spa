import { renderMainMenu } from "./functions/menuBuilder";
import './css/app.css'

const app = document.getElementById('app');
app.innerHTML = `

    <nav id="menu" class="sidenav"></nav>
    <main id="main-content" class="container"></main>

`
renderMainMenu();
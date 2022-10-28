import "./components/index.js";
import { queryUser } from "./services/db.js";
enum Screens {
    login,
    register,
    home
}

class AppContainer extends HTMLElement{
    screen: Screens = Screens.register;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();

        const GoSignUp = this.shadowRoot?.querySelector("app-register");
        GoSignUp?.addEventListener("register-success", ()=>{
            this.screen = Screens.login;
            this.render();
            
            const login = this.shadowRoot?.querySelector("app-login");
            login?.addEventListener("login-success", ()=>{
            this.screen = Screens.home;
            this.render();
        })
        })

        const login = this.shadowRoot?.querySelector("app-login");
        login?.addEventListener("login-success", ()=>{
            this.screen = Screens.home;
            this.render();
        })
    }

    render(){
        if(!this.shadowRoot) return;
        switch (this.screen) {
            case Screens.home:
                this.shadowRoot.innerHTML = `
                    <link href="./components/Home/Home.css" rel="stylesheet">
                    <div class="body-feed">
                        <my-nav></my-nav>
                        <app-home></app-home>
                        <my-suggest></my-suggest>
                    </div>
                `
                break;
        
            case Screens.login:
                this.shadowRoot.innerHTML = "<app-login></app-login>"
            break;
            
            case Screens.register:
                this.shadowRoot.innerHTML = "<app-register></app-register>"
            break;

            default:
                break;
        }
    }
}

customElements.define("app-container",AppContainer);
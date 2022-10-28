import "./components/index.js";
import dataStories from "./dataStories.js";
console.log(dataStories);
import dataPost from "./dataPost.js";
console.log(dataPost);
import { AttributeStories } from "./components/Stories/Stories.js";
import { AttributePost } from "./components/Post/Post.js";
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.stories = [];
        this.posts = [];
        this.attachShadow({ mode: 'open' });
        dataStories.forEach((data) => {
            const storieCard = this.ownerDocument.createElement("my-stories");
            storieCard.setAttribute(AttributeStories.pic, data.pic);
            storieCard.setAttribute(AttributeStories.username, data.username);
            this.stories.push(storieCard);
        });
        dataPost.forEach((data) => {
            const postCard = this.ownerDocument.createElement("my-post");
            postCard.setAttribute(AttributePost.pictureprofile, data.pictureprofile);
            postCard.setAttribute(AttributePost.user, data.user);
            postCard.setAttribute(AttributePost.ubi, data.ubi);
            postCard.setAttribute(AttributePost.content, data.content);
            postCard.setAttribute(AttributePost.likes, data.likes);
            postCard.setAttribute(AttributePost.description, data.description);
            postCard.setAttribute(AttributePost.coments, data.coments);
            postCard.setAttribute(AttributePost.date, data.date);
            this.posts.push(postCard);
        });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            this.stories.forEach((storie) => {
                var _a;
                (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(storie);
            });
            this.posts.forEach((post) => {
                var _a;
                (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(post);
            });
        }
    }
}
customElements.define("app-container", AppContainer);

import "./components/index.js";

import dataStories from "./dataStories.js";
console.log(dataStories);

import dataPost from "./dataPost.js";
console.log(dataPost);

import MyStory, {AttributeStories} from "./components/Stories/Stories.js";
import MyPost, {AttributePost} from "./components/Post/Post.js";

export class Home extends HTMLElement{
    stories: MyStory[] = [];
    posts: MyPost[] = [];

    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        dataStories.forEach((data)=>{
            const storieCard = this.ownerDocument.createElement("my-stories") as MyStory;
            storieCard.setAttribute(AttributeStories.pic, data.pic);
            storieCard.setAttribute(AttributeStories.username, data.username);
            this.stories.push(storieCard)
        });

        dataPost.forEach((data)=>{
            const postCard = this.ownerDocument.createElement("my-post") as MyPost;
            postCard.setAttribute(AttributePost.pictureprofile, data.pictureprofile);
            postCard.setAttribute(AttributePost.user, data.user);
            postCard.setAttribute(AttributePost.ubi, data.ubi);
            postCard.setAttribute(AttributePost.content, data.content);
            postCard.setAttribute(AttributePost.likes, data.likes);
            postCard.setAttribute(AttributePost.description, data.description);
            postCard.setAttribute(AttributePost.coments, data.coments);
            postCard.setAttribute(AttributePost.date, data.date);
            this.posts.push(postCard)
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `<link rel="stylesheet" href="./components/Home/index.css">`;
            const storiesContainer = this.ownerDocument.createElement("div");
            storiesContainer.classList.add('stories-container');
            this.stories.forEach((storie) => {
                var _a;
                storiesContainer.appendChild(storie);
            });
            this.shadowRoot?.appendChild(storiesContainer);
            this.posts.forEach((post)=>{
                this.shadowRoot?.appendChild(post);
            })
        }
    }
}

customElements.define("app-home", Home);
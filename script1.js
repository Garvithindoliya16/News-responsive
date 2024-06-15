const API_KEY= "33bf0175cb2b47f9bd452c361166994b";
const url="https://newsapi.org/v2/everything?q=";

function reload(){
    window.location.reload();
}

window.addEventListener("load",()=> fetchNews("bharat"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // console.log(res);
    const data = await res.json()
    bindData(data.articles);
    // console.log(data.articles);
}

function bindData(articles){
    const temp=document.getElementById("template-news-card");
    const div=document.getElementById("cards-container");

    div.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=temp.content.cloneNode(true);
        appenddata(cardclone,article)
        div.appendChild(cardclone);
    });
}

 function appenddata(cardclone,article){
    const newsimg=cardclone.getElementById("news-img");
    const newstitle=cardclone.getElementById("news-title");
    const newsdesc=cardclone.getElementById("news-desc");
    const newssource=cardclone.getElementById("news-source");

    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description

    const date=new Date(article.publishedAt).toLocaleString("en-UN",{
        timeZone: "Asia/Jakarta"
    })

    newssource.innerHTML=`${article.source.name} :${date}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url);
    })
}

let cursorSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    cursorSelectedNav?.classList.remove("active");
    cursorSelectedNav=navItem;
    cursorSelectedNav.classList.add("active");

}

const searchbtn=document.getElementById("search-button");
const searcbar=document.getElementById("input");
searchbtn.addEventListener("click",()=>{
    const query=searcbar.value;
    if(!query) return;
    fetchNews(query);
    cursorSelectedNav?.classList.remove("active")
    cursorSelectedNav=null;
})




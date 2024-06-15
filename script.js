const API_KEY= "33bf0175cb2b47f9bd452c361166994b";
const url="https://newsapi.org/v2/everything?q=";


window.addEventListener("load",()=> fetchNews("India"))

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    

    
    bindData(data.articles);
};

function bindData(articles){
    const cardscontainer=document.getElementById("cards-container");
    const template=document.getElementById("template-news-card")

    cardscontainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return ;
        const cardclone=template.content.cloneNode(true);
        fillDataInCard(cardclone,article)
        cardscontainer.appendChild(cardclone);
    });
}


function fillDataInCard(cardclone,article){
    const newsimg=cardclone.getElementById('news-img')
    const newstitle=cardclone.getElementById('news-title')
    const newssource=cardclone.getElementById('news-source')
    const newsdesc=cardclone.getElementById('news-desc')

    newsimg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newssource.innerHTML = `${article.source.name}:${date}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
    
}


let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navitems=docement.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navitems;
    curSelectedNav.classList.add("active");
}

const serachbtn=document.getElementById("search-button");
const serachtxt=document.getElementById("input");
serachbtn.addEventListener("click",()=>{
    const query=serachtxt.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active")
    curSelectedNav=null;
})


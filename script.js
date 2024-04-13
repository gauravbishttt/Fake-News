const API_KEY = "135b844c64d54e7bb2e671764f08fd28";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.querySelector("#cards-container");
    const newsCardTemplate = document.querySelector("#template-news-card");

    cardsContainer.innerHTML = "";
    
    articles.forEach((article) => {
        if(!article.urlToImage || !article.title || !article.description) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDescription = cardClone.querySelector("#news-desc");

    //newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title;
    newsDescription.textContent = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} - ${date}`;
    
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

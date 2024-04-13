const API_KEY = "135b844c64d54e7bb2e671764f08fd28";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    console.log("Fetching news for query:", query);
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    console.log("Response from API:", res);
    const data = await res.json();
    console.log("Data received:", data);
    bindData(data.articles);
}

function bindData(articles){
    console.log("Received articles:", articles);
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    console.log("Cards Container:", cardsContainer);
    console.log("News Card Template:", newsCardTemplate);

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) {
            console.log("Skipping article without image:", article);
            return;
        }
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    console.log("Filling data in card for article:", article);
    const cardImage = cardClone.querySelector("#news-img");
    const cardTitle = cardClone.querySelector("#news-title");
    const cardDescription = cardClone.querySelector("#news-desc");
    const newsSource = cardClone.querySelector("#news-source");

    console.log("Card elements:", cardImage, cardTitle, cardDescription, newsSource);

    cardImage.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} - ${date}`;
    
    console.log("Article URL:", article.url);
    
    cardClone.firstElementChild.addEventListener("click", () => {
        console.log("Opening URL:", article.url);
        window.open(article.url, "_blank");
    });

}

const accessKey = "YOUR_REAL_API_KEY";

// pagination -> pagination is a process of dividing a large body of content or data into smaller distinct pages 
let page = 1;

const form = document.querySelector("form");
const searchInput = document.getElementById("search_input");
const searchResults = document.querySelector(".search_results");
const showMore = document.querySelector(".show-more");

async function searchImage(){
    const inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1){
        searchResults.innerHTML="";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search_results");

        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        searchResults.appendChild(imageWrapper);
    });

    page++;
    showMore.style.display = "block";

};

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImage();
});

showMore.addEventListener("click",()=>{
    searchImage();
});
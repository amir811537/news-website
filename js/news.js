const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');

    const trimmedData = data.data.news_category;
    trimmedData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadNews('${category.category_id}')"
            class="tab tab-bordered">${category.category_name}</a>`;
        tabContainer.appendChild(div);
    });
    console.log(data.data.news_category);
};

const handleLoadNews = async (categoryId) => {
   
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
        const data = await res.json();
console.log(data.data)
        const cardContainer = document.getElementById('card-container');

        cardContainer.innerHTML = ''; 

        data.data?.forEach((news) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card bg-base-100 shadow-xl">
                    <figure><img src="${news?.image_url}" alt="${news.title}" /></figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold">${news.title}</h2>

                        <p><span class="font-bold">Author: </span>${news.author.name}</p>
                        <p><span class="font-bold">Published Date:</span> ${news.author.published_date}</p>
                        <p>Rating: ${news?.rating?.number} (${news?.rating?.badge})</p>
                        <p>Total Views: ${news.total_view}</p>

                        <div class="card-actions justify-end">
                            <button class="btn btn-primary read-more-btn">Read More</button>
                        </div>

                        <div class="details" style="display: none;">
                            <p><span class="font-bold"></span> ${news.details}</p>
                        </div>
                    </div>
                </div>`;
            cardContainer.appendChild(div);

            const readMoreButton = div.querySelector('.read-more-btn');
            const detailsDiv = div.querySelector('.details');

            readMoreButton.addEventListener('click', () => {
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                    readMoreButton.textContent = 'Read Less';
                } else {
                    detailsDiv.style.display = 'none';
                    readMoreButton.textContent = 'Read More';
                }
            });
        });

        console.log(data);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

handleCategory();
handleLoadNews('08')










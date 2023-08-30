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
        
        const cardContainer = document.getElementById('card-container');
        
        cardContainer.innerHTML = ''; // Clear existing content
        
        data.data.forEach((news) => {
            const div = document.createElement('div');
            div.innerHTML = `<div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src="${news.image_url}" alt="${news.title}" /></figure>
            <div class="card-body">
                <h2 class="card-title">${news.title}</h2>
                
                <p>Author: ${news.author.name}</p>
                <p>Published Date: ${news.author.published_date}</p>
                <p>Category ID: ${news.category_id}</p>
                <p>Rating: ${news.rating.number} (${news.rating.badge})</p>
                <p>Total Views: ${news.total_view}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Read More</button>
                </div>
            </div>
        </div>`;
            cardContainer.appendChild(div);
        });

        console.log(data);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

handleCategory();
{/* <p>amir${news.details}</p> */}
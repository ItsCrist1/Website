let base_prices = []; // to be fetched

function getCurrency(price, rate) {
    return (parseFloat(price) * rate).toFixed(2);
}

async function fetchExchangeRates(base_prices_ron) {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/RON");
        const data = await response.json();
        
        const eurRate = data.rates.EUR;
        const usdRate = data.rates.USD;
        
        for(let i=0; i< base_prices_ron.length; ++i)
            base_prices[i] = [getCurrency(base_prices_ron[i], eurRate), getCurrency(base_prices_ron[i], usdRate)];
        
        console.log('Exchange rates fetched successfully:', base_prices, data);
        return base_prices;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const base_prices_ron = [2981, 2399, 3299]; // hard coded, Order: Emag, Altex, Flanco
    
    await fetchExchangeRates(base_prices_ron);
    
    let i = 0;
    document.querySelectorAll(".prices").forEach(element => {
        element.querySelector(".ron").innerHTML = `${base_prices_ron[i]} RON`;
        element.querySelector(".euro").innerHTML = `€${base_prices[i][0]}`;
        element.querySelector(".usd").innerHTML = `$${base_prices[i++][1]}`;
    });
});
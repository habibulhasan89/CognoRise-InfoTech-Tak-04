document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convertButton");
    const resultText = document.getElementById("resultText");

    const apiKey = '68500949915b8f75d3652a2f';  // Replace 'YOUR_API_KEY' with your actual API key from ExchangeRate-API
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Fetch exchange rates and populate the dropdowns
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.conversion_rates;
            const currencies = Object.keys(rates);

            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                fromCurrencySelect.appendChild(option1);
                toCurrencySelect.appendChild(option2);
            });
        })
        .catch(error => console.error("Error fetching exchange rates:", error));

    // Convert currency
    convertButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultText.textContent = "Please enter a valid amount.";
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (amount * rate).toFixed(2);
                resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => console.error("Error fetching conversion rate:", error));
    });
});

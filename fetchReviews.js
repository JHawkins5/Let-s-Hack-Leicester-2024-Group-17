const url = "/data";

async function fetchData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok. " + response.statusText)
        }

        const data = await(response.json());

        console.log(data);
    }
    catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);
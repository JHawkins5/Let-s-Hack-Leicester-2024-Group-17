const url = "/data";

async function fetchData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok. " + response.statusText)
        }

        const data = await(response.json());

        console.log(data);

        data.forEach(entry => {
            const name = entry['name'];
            console.log(name.value);
            const accommodation = entry['accommodation'];
            console.log(accommodation.value);
            const roomType = entry['roomtype'];
            console.log(roomType.value);
            const rating = entry['rating'];
            console.log(rating.value);
            const review = entry['review'];
            console.log(review.value);
        });
    }
    catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);

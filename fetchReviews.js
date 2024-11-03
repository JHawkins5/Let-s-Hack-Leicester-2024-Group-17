const url = "/data";

async function fetchData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok. " + response.statusText)
        }

        const data = await(response.json());

        console.log(data);

        data['reviews']['freemans']['ensuite'].forEach(entry => {
            var div = document.createElement("div");
            const name = entry['name'];
            console.log(name);
            const accommodation = entry['accommodation'];
            console.log(accommodation);
            const roomType = entry['roomtype'];
            console.log(roomType);
            const rating = entry['rating'];
            console.log(rating);
            const review = entry['review'];
            console.log(review);
            div.innerHTML = name + "\n\n" + accommodation + " - " + roomType + "\n\n" + rating + " stars" + "\n\n" + review;
            document.body.appendChild(div);
        });

        data['reviews']['freemans']['studio'].forEach(entry => {
            const name = entry['name'];
            console.log(name);
            const accommodation = entry['accommodation'];
            console.log(accommodation);
            const roomType = entry['roomtype'];
            console.log(roomType);
            const rating = entry['rating'];
            console.log(rating);
            const review = entry['review'];
            console.log(review);
        })

        data['reviews']['freemans']['shared'].forEach(entry => {
            const name = entry['name'];
            console.log(name);
            const accommodation = entry['accommodation'];
            console.log(accommodation);
            const roomType = entry['roomtype'];
            console.log(roomType);
            const rating = entry['rating'];
            console.log(rating);
            const review = entry['review'];
            console.log(review);
        })
    }
    catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);

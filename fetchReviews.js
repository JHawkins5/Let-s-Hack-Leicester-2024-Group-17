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

            const currentPath = window.location.pathname;
            const currentDocumentName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            if (currentDocumentName == 'freemans.html') {
                div.innerHTML = name + "\n\n" + accommodation + " - " + roomType + "\n\n" + rating + " stars" + "\n\n" + review;
                document.body.appendChild(div);
            }
        });

        data['reviews']['freemans']['studio'].forEach(entry => {
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
            
            const currentPath = window.location.pathname;
            const currentDocumentName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            if (currentDocumentName == 'freemans.html') {
                div.innerHTML = name + "\n\n" + accommodation + " - " + roomType + "\n\n" + rating + " stars" + "\n\n" + review;
                document.body.appendChild(div);
            }
        })

        data['reviews']['freemans']['shared'].forEach(entry => {
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
            
            const currentPath = window.location.pathname;
            const currentDocumentName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            if (currentDocumentName == 'freemans.html') {
                div.innerHTML = name + "\n\n" + accommodation + " - " + roomType + "\n\n" + rating + " stars" + "\n\n" + review;
                document.body.appendChild(div);
            }
        })
    }
    catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);
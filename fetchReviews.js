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
            const elements = [name, accommodation, roomType, rating, review]

            const currentPath = window.location.pathname;
            const currentDocumentName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            if (currentDocumentName == 'freemans.html') {
                for (let i = 0; i < 6; i++) {
                    var subdiv = document.createElement("div");
                    switch (i) {
                        case 0:
                            subdiv.innerHTML = "Name: " + name;
                            break;
                        case 1:
                            subdiv.innerHTML = "Location: " + accommodation;
                            break;
                        case 2:
                            subdiv.innerHTML = "Room type: " + roomType;
                            break;
                        case 3:
                            subdiv.innerHTML = "Rating: " + rating + " stars"
                            break;
                        case 4:
                            subdiv.innerHTML = "Review: &nbsp;" + review;
                            break;
                        case 5:
                            subdiv.innerHTML = "&nbsp;";
                            break;
                    }
                    
                    div.appendChild(subdiv);
                }
            }

            document.body.appendChild(div);
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
                div.innerHTML = name + "\n" + accommodation + " - " + roomType + "\n" + rating + " stars" + "\n" + review;
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
                div.innerHTML = name + "\n" + accommodation + " - " + roomType + "\n" + rating + " stars" + "\n" + review;
                document.body.appendChild(div);
            }
        })
    }
    catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);

// identify the form and load it when the document has loaded
window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');

    // set error messages for validation
    const RATING_REQUIRED = "Please enter a rating.";
    const REVIEW_REQUIRED = "Please enter a review.";

    function hasValue(input, message) {
        // if the input is empty, show an error
        if (input.value.trim() === "") {
            alert(message);
        }
        else {
            return input;
        }
    }

    form.addEventListener('submit', function (event) {
        // stop the form from submitting
        event.preventDefault();
        var object = {};

        // load the values from the form and map their values
        const name = form.elements[0];
        let fullName = name.value;
        object['fullName'] = fullName;
        const organisation = form.elements[1];
        let org = organisation.value;
        object['organisation'] = org;
        const roomType = form.elements[2];
        let room = roomType.value;
        object['roomType'] = room;

        if (hasValue(form.elements[3], RATING_REQUIRED)) {
            const rating = document.querySelector('input[name="rating"]:checked').value;
            object['rating'] = rating;
        }
        else {
            return;
        }

        if (hasValue(form.elements[4], REVIEW_REQUIRED)) {
            const reviewString = form.elements[4];
            let review = reviewString;
            object['review'] = review;
        }
        else {
            return;
        }
        
        // convert the data to JSON
        //var json = new FormData();
        //json.append('json', JSON.stringify(object));

        //fetch("/echo/json",
        //{
        //    method: "POST",
        //    body: json
        //})
        //.then(res => res.json())
        //.then(res => console.log(res));

        //console.log(json);
        //return json;
    });
})

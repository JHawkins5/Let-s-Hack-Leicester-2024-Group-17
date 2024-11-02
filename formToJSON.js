// identify the form and load it
const form = document.getElementById('form');

// set error messages for validation
const RATING_REQUIRED = "Please enter a rating.";
const REVIEW_REQUIRED = "Please enter a review.";

function hasValue(input, message) {
    // if the input is empty, show an error
    if (input.value.trim() === "") {
        alert(message);
    }
}

form.addEventListener('Submit', function (event) {
    // stop the form from submitting
    event.preventDefault();

    // load the values from the form and save their values
    const name = form.elements[0];
    let fullName = name.value;
    const organisation = form.elements[1];
    let org = organisation.value;
    const roomType = form.elements[2];
    let room = roomType.value;
    const rating = hasValue(form.elements[3], RATING_REQUIRED);
    let rate = rating.value;
    const reviewString = hasValue(form.elements[4], REVIEW_REQUIRED);
    let review = reviewString.value;
    console.log('executing')
    // if the rating and review are not null, map each value to a dictionary
//    if (!(rate.value == null || review.value == null)) {
//        var object = {};
        
//        FormData.forEach(function(value, key){
//            object[key] = value;
//        });

        // turn the dictionary into JSON
        var json = JSON.stringify(object);
        console.log(json);
        return json;
//    }

    return null;
});
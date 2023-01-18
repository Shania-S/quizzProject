var correctAnswer = document.getElementById("correctAnswer");
var countWrongA = 0;
var enabled = true;
const otherOpt = [];
var onlyChecked = "";
var dict = {};

/* Check user input, iterate over all the options, and verify if checked answer is equal to the correct one 
   If it's correct, the user can't do anything anymore, the other elements are disabled.
*/
function displayRadioValue() {

    var allOptions = document.getElementsByName("option");

    for (i = 0; i < allOptions.length; i++) {
        if (allOptions[i].checked) {
            checked_val = allOptions[i].value;
            if (checked_val == correctAnswer.value) {
                // if he clicked on wrong answers, create a dictionary and send it to the server
                const questionId = document.getElementById("thequestion").value;
                dict[questionId] = countWrongA;
                const csrf = document.getElementsByName('csrfmiddlewaretoken')
                dict['csrfmiddlewaretoken'] = csrf[0].value
                $.ajax({
                    url: `/wrongAnswer`,
                    type: "POST",
                    data: dict,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert('error');
                    },
                    //timeout : 1000//timeout of the ajax call
                });


                opt = document.getElementsByClassName(checked_val);
                const audio = new Audio('../../static/base/correctA.mp3');
                audio.play();
                opt[0].style.backgroundColor = '#35E699';
                document.getElementById("check-answer").disabled = true;
                document.getElementById("check-answer").style.backgroundColor = "white";
                document.getElementById("check-answer").style.color = "grey";
                opt[0].style.pointerEvents = "none";
                enabled = false;
                onlyChecked = allOptions[i].value;
                setTimeout(explanationBox, 1000);


            }
            else {
                countWrongA++;
                opt = document.getElementsByClassName(checked_val);
                const audio = new Audio('../../static/base/wrongA.mp3');
                audio.play();
                opt[0].style.backgroundColor = '#D63D3D';
            }
        }

        otherOpt.push(allOptions[i].value);

    }

    // Disable the other options
    for (j = 0; j < otherOpt.length; j++) {

        if (otherOpt[j] != onlyChecked && enabled == false) {
            labelClassRest = document.getElementsByClassName(otherOpt[j]);
            labelClassRest[0].style.color = "grey";
            labelClassRest[0].style.borderColor = "grey";
            labelClassRest[0].style.cursor = "default";
            spann = labelClassRest[0].getElementsByTagName('span');
            spann[0].style.borderColor = "grey";
            document.getElementById(otherOpt[j]).disabled = true;
        }
    }


}

// When clicking on an option, the focus will be permament
function deepFocus() {

    if (enabled) {
        var allOptions = document.getElementsByName("option");
        for (i = 0; i < allOptions.length; i++) {
            if (allOptions[i].checked) {
                checked_val = allOptions[i].value;
                const opt = document.getElementsByClassName(checked_val);
                opt[0].style.backgroundColor = '#827081';
                opt[0].style.color = 'white';
            }
            else {
                checked_val = allOptions[i].value;
                const opt = document.getElementsByClassName(checked_val);
                opt[0].style.backgroundColor = 'white';
                opt[0].style.color = 'black';
            }
        }

    }

}

// After finding the correct answer, this box will show up, contains the correct answer + more info
function explanationBox() {
    exp = document.getElementById("questionExp");
    let m = `<strong>Answer</strong> : ${correctAnswer.value}<br> <strong>Explanation</strong> : <br> ${exp.value}`;
    Swal.fire({
        html: '<p style="font-family:cursive; text-align: justify;text-justify: inter-word;">' + m + '</p>',

        height: '150px',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

/* Iterate over the class */
for (const redElement of document.querySelectorAll('.categoryId')) {

    /* Add click event handler */
    redElement.addEventListener('click', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes 😎!',
            cancelButtonText: 'No 😅!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            var id = $(this).data("value");
            if (result.isConfirmed) {
                window.location.href = "deleteCategory/" + id;
            }

        })
    });
}


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
var selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".optionsContainer");
var optionsList = Array.prototype.slice.call(document.querySelectorAll(".option"));
var idList = [];
var editText = "";

// Display the list
selected.addEventListener("click", displayOptions);
function displayOptions() {
    optionsContainer.classList.toggle("active"); // if if doesn't have the class active, it will add it and vice versa
}


for (var i = 0; i < optionsList.length; i++) {
    var opt = optionsList[i];
    opt.onclick = dynamicEditOption;
}

function dynamicEditOption() {
    let labelId = this.querySelector("label").id; // this is the clicked element
    selected.innerHTML = document.getElementById(labelId).innerHTML; // place the clicked option on selected div
    optionsContainer.classList.remove("active");

    var editOptionInput = $("#selectBox" + "").find(".editOption");
    idList.push(labelId);

    document.getElementById("editOption").value = document.getElementById(labelId).innerHTML;// place the option in the input so that it can be edited
    editOptionInput.slideDown();

    // Editing the editOption input
    editOptionInput.on("keyup", function (event) {
        editText = editOptionInput.val();
        selected.innerHTML = editText; // change selected value with input value

    });

    editOptionInput.on("focusout", function (event) {
        editOptionInput.slideUp();
        for (var i = 0; i < idList.length; i++) {
            if (idList[i] === labelId) {
                idList.splice(i, 1);
                document.getElementById(labelId).innerHTML = selected.innerHTML;
            }
        }

    });
};


// By clicking on the plus icon, a popup box will appear for the user to enter an option
const btnAddOption = document.getElementById("addOption");
const btnRemoveOption = document.getElementById("removeOption");

//Add event listeners
btnAddOption.addEventListener("click", popOutNow);
btnRemoveOption.addEventListener("click", removeSelectedOption);

// Display the popup box to enter option
function popOutNow(e) {
    e.preventDefault();
    document.getElementById("theOption").value = "";
    document.querySelector(".popContainer").style.display = "flex";
}

function removeSelectedOption(e) {
    e.preventDefault();
    console.log(optionsList.length);
    var selected_el = selected.innerHTML;
    var found = false;
    var i = 0;
    const response = confirm("Are you sure you want to do that?");


    if (response) {
        alert("Ok was pressed");
        while (i < optionsList.length && !found) {
            console.log(found);
            let labelId = optionsList[i].querySelector("label").id;
            let labelText = document.getElementById(labelId).innerHTML;
            if (labelText == selected_el) {
                let optionId = optionsList[i].id;
                elementToRemove = document.getElementById(optionId);
                elementToRemove.remove();
                selected.innerHTML = "Click on the icon to add options";
                found = true;
            }
            i++;
        };

    } else {
        alert("Cancel was pressed");
    }


}

// To close the popup box
const closePopup = document.getElementById("close");
closePopup.addEventListener("click", closePopout);

function closePopout(e) {
    e.preventDefault();
    document.querySelector(".popContainer").style.display = "none";
}

// Put the option entered by the user among the others
const btnSendinput = document.getElementById("btnOk");
btnSendinput.addEventListener("click", getInputValue);
function getInputValue(e) {
    e.preventDefault();
    console.log("enter here");
    userInput = document.getElementById('theOption').value;
    var divOption = document.createElement('div');
    divOption.className = 'option';
    divOption.id = userInput.split(' ').join('') + 0 + Math.floor(Math.random() * (100 - 0 + 1));;
    divOption.innerHTML = "<input type='radio' class='radio' name='category'><label id =" + userInput.split(' ').join('') + '>' + userInput + "</label>";
    $(".optionsContainer").append(divOption);
    divOption.onclick = dynamicEditOption;
    document.querySelector(".popContainer").style.display = "none";
    optionsList.push(divOption); // add the new option in the list of options

}
const btnAddQ = document.getElementById("btnAddQuestion");
btnAddQ.addEventListener("click", toaddQuestion);
function toaddQuestion() {
    btnAddQ.setAttribute("disabled", "disabled");
    var options = ""

    var quesCategoryId = $("#quesCategoryId").val();
    for (var i = 0; i < optionsList.length; i++) {
        let labelId = optionsList[i].querySelector("label").id;
        let labelText = document.getElementById(labelId).innerHTML;
        options+=labelText+";";
    }
    
    document.getElementById("options").value = options;


    var formData = {
        question: $("#question").val(),
        answer: $("#answer").val(),
        options: $("#options").val(),
        explanation: $("#explanation").val(),
    };

    $.ajax({
        type: "POST",
        url: quesCategoryId,
        data: formData,
        dataType: "json",
        encode: true,
        success: function (data) {
            if (data=="success") {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Question added successfully',
                    showConfirmButton: true
                  }).then((result) => {
    
                    if (result.isConfirmed) {
                        window.location.href = "../categories";
                    }
        
                })

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "All the fields are required !",
            
                  }).then((result) => {
    
                    if (result.isConfirmed) {
                        window.location.href = "../category/"+quesCategoryId;
                    }
        
                })
            
        

            }
        
           
          

        }
    })

}


function emojiRain() {
    
    var totalPoint = document.getElementById('totalPoint').value;
    var averagePoint = document.getElementById('averagePoint').value;
    var finalScore = document.getElementById("tfootScore");

    if (totalPoint < averagePoint) {
        
        finalScore.style.backgroundColor = 'red';
        var emoji = ['🌧', '😭', '😶', '😐', '😕'];
       rainrainEmoji(emoji);
    }
    else {
        var emoji = ['😎', '🥳', '👏', '💃', '🕺', '🔥', '🎊', '🎉', '💯'];
        rainrainEmoji(emoji);
    }


}

function rainrainEmoji (emoji) {
    var container = document.getElementById('animate');
    var circles = [];

    for (var i = 0; i < 5; i++) {
      addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    }
    
    
    
    function addCircle(delay, range, color) {
      setTimeout(function() {
        var c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
          x: -0.15 + Math.random() * 0.3,
          y: 1 + Math.random() * 1
        }, range);
        circles.push(c);
      }, delay);
    }
    
    function Circle(x, y, c, v, range) {
      var _this = this;
      this.x = x;
      this.y = y;
      this.color = c;
      this.v = v;
      this.range = range;
      this.element = document.createElement('span');
      this.element.style.opacity = 0;
      this.element.style.position = 'absolute';
      this.element.style.fontSize = '26px';
      this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
      this.element.innerHTML = c;
      container.appendChild(this.element);
    
      this.update = function() {
        if (_this.y > 800) {
          _this.y = 80 + Math.random() * 4;
          _this.x = _this.range[0] + Math.random() * _this.range[1];
        }
        _this.y += _this.v.y;
        _this.x += _this.v.x;
        this.element.style.opacity = 1;
        this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
        this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
        this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
      };
    }
    
    function animate() {
      for (var i in circles) {
        circles[i].update();
      }
      requestAnimationFrame(animate);
    }
    
    animate();
    

}

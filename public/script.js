// var arr;

var showno = 5;

if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

$('.carousel').carousel({
    interval: 10,
    pause: false
  })

  function showmore() {
    showno = showno + 5;
    getData()
}

function getData() {
    $.get("/show", function(data, status){
        // console.log("getData works")
        // var arr = JSON.parse(data);
        var arr = data;
        
        // console.log(data);
        $("#listings").html("");
        
        for (var i=0; i<showno; i++)
    {
       $("#listings").append(`
       <div class="card" style="box-shadow: 10px 10px grey;">
       <h5 style="color: white" class="card-header bg-primary">Project &#8470; ${arr[i].tourID}</h5>
       <div class="card-body">
       <div class="card-text">
       <div class="row">
               <div class="col-md-12">
       <p><b>Project Description:</b> ${arr[i].description}<hr>
                </div>
       </div>
           <div class="row">
           <div class="col-md-4">
       <b>Budget Per Task:</b> $${arr[i].budget}.00</p>
       <a href="/page6" class="btn btn-warning">Log in to contact this business</a> 
               </div>
               <div class="col-md-3">
               <b>Tasks:</b> ${arr[i].people}<br>
               </div>
               <div class="col-md-5">
               <b>Project Deadline:</b> ${arr[i].date} <span class="helperText">(YYYY/MM/DD)</span><br>
               <br>
               <button class="float-right" style="background: red; padding: 2px;" onclick="flag(${arr[i].tourID})">flag listing</button>
               </div>
           </div>
       </div>
       </div>
   </div>
        <br>
        `);
        } 
        $("#listings2").html(`<button onclick="showmore()">Show More</button>`);
        console.log("button");
    })
}


// function send() {
//     console.log("function send()");
//     var form = document.getElementById("sendEmail");

//     var mailTo = btn.value;
//     console.log(mailTo)
//     form.action = mailTo;
//     form.submit()
//     var modal = document.getElementById('myModal');
//     modal.style.display = "none";
// }

function send(e) {
    console.log("function send()");
    var form = document.getElementById("sendEmail");

    var mailTo = sessionStorage.getItem('email');;
    // console.log(mailTo)
    form.action = `mailto:${mailTo}`;
    form.submit()
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    window.location.href = "#";
}

function signup(){
    window.location.href = "/page3";
}

// function googleTranslateElementInit() {
//     new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
//   }

// function construction() {
//     alert("The sign up page is currently under construction.  In the mean time, please use the account-free versions of the site.")
// }

// const countries = "http://country.io/names.json";

// fetch(countries)
// .then((resp) => resp.json())
// .then(function(data) {
//     let code = data;
//     console.log((_.invert(code))[france]);
// })

// const url = "http://www.geognos.com/api/en/countries/info/"+code+".html";

// fetch(url)
// .then((resp) => resp.json())
// .then(function(data) {
//     let dog = data.message;
//     console.log(dog)
// })

function flag(id) {
    $.post("/flag", {tourID: id}, function(data){
        alert("posting flagged for review")
    })
}
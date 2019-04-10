// var arr;

if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

$('.carousel').carousel({
    interval: 10,
    pause: false
  })

function getData() {
    $.get("/show", function(data, status){
        // console.log("getData works")
        // var arr = JSON.parse(data);
        var arr = data;
        // console.log(data);
        for (var i=0; i<arr.length; i++)
    {
       $("#listings").append(`
       <div class="card" style="box-shadow: 10px 10px grey;">
       <h5 style="color: white" class="card-header bg-primary">${arr[i].city}, ${arr[i].country}</h5>
       <div class="card-body">
       <div class="card-text">
           <div class="row">
               <div class="col-md-9">
       <p><b>I would like to go to or/and see:</b> ${arr[i].description}<br><b>The number of people on this tour is:</b> ${arr[i].people}<br><b>Tour Date:</b> ${arr[i].date} <span class="helperText">(YYYY/MM/DD)</span><br><b>Tour Time:</b> ${arr[i].time}<br><b>My budget is:</b>  ${arr[i].budget}.00 <span class="helperText">(in local currency)</span></p>
       <button href="/page6" class="btn btn-warning">Login as a Local to contact this person</button>
               </div>
               <div class="col-md-3">
       <img style="float: right;" src="https://www.mapquestapi.com/staticmap/v5/map?key=Zs2Sg9rdlJl0tdV45Tu8tGlbj0QkyOJI&center=${arr[i].city},${arr[i].country}&size=200,200" srcset="https://www.mapquestapi.com/staticmap/v5/map?key=Zs2Sg9rdlJl0tdV45Tu8tGlbj0QkyOJI&center=${arr[i].city},${arr[i].country}&size=200,200@2x 2x">
               </div>
           </div>
       </div>
       </div>
   </div>
        <br>
        `);

        } 

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
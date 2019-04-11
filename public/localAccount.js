function loadLocal() {

    var luser = sessionStorage.getItem("userL");
    var lpass = sessionStorage.getItem("passwordL");

    $.post("/matchLocal", {usrName: luser, usrPass: lpass}, function(data){
        // console.log(data[0])
        if (data[0].username===luser && data[0].password===lpass) {

$("#lLoad").append(`<div class="row">
<div class="col-md-12">
    <header>
        <nav class="navbar">
        <span class="title"><h1>CoderMatch DC</h1></span>
            <ul class="nav justify-content-end">
                
                <li class="nav-item">
                    <a class="nav-link" onclick="logOutb()" href="#">Log Out</a>
                </li>
                <!-- <div id="google_translate_element"></div> -->
            </ul>
        </nav>
    </header>
</div>
</div>
<div class="container">
<br>
<div class="row">
<div class="col-md-12">
<h2>Hello ${data[0].username}. Browse All Projects Currently Accepting Proposals</h2>
</div>
</div>
<div class="row">
<div class="col-md-12">
<h6>Press <code>ctrl-f</code> (PC) or <code>cmd-f</code> (Mac) to search listings.</h6>
<h6>You will need an active email client on your computer to contact a Business.</h6>
</div>
</div>
<br>
<div class="row">
<div class="col-md-12">
<div id="listings">

</div>
</div>
</div>
</div>
<br>
<!-- The Modal -->
<div id="myModal" class="modal">

<div class="modal-content">
<span class="close">&times;</span>
<h2>Send an email to this Tourist</h2>
<form style="font-size: 18px;" onsubmit="send()" action="#" method="GET" id="sendEmail" enctype="text/plain">
Email Subject:<br>
<input style="font-size: 18px; width: 100%;" name="subject" type="text" /><br>
Your message to this person:<br>
<textarea style="font-size: 18px; width: 100%;" id="sendM" name="body" cols="60" rows="7" maxlength="799" required></textarea><br>
<input class="btn btn-primary" type="submit" value="Create Email">
</form>
</div>

</div>

</body>
<footer><hr>&nbsp;Tour With a Local &copy; 2018<span class="ourEmail">Questions, Comments, Help? Contact: tourwithalocal.us@gmail.com</span></footer>
</html>`)

$.get("/show", function(data, status){
    // console.log("getData works")
    // var arr = JSON.parse(data);
    var arr = data;
    // console.log(data);
    for (var i=0; i<arr.length; i++)
{
   $("#listings").append(`
   <div class="card" style="box-shadow: 10px 10px grey;">
   <h5 style="color: white" class="card-header bg-primary">${arr[i].tourID}</h5>
   <div class="card-body">
   <div class="card-text">
       <div class="row">
           <div class="col-md-9">
           <p><b>Project Description:</b> ${arr[i].description}<br><b>About Us:</b> ${arr[i].people}<br><b>Project Deadline:</b> ${arr[i].date} <span class="helperText">(YYYY/MM/DD)</span><br><b>Budget:</b>  ${arr[i].budget}.00</p>
   <button id='myBtn${arr[i].tourID}' value='${arr[i].email}' href="#" class="btn btn-warning">Contact this Business</button>
           </div>
           <div class="col-md-3">
   
           </div>
       </div>
   </div>
   </div>
</div>
    <br>
    `);
    
    var btn = document.getElementById(`myBtn${arr[i].tourID}`);
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById('myModal');

    btn.onclick = function() {
        // console.log(this.value);
        sessionStorage.setItem('email', this.value);
        modal.style.display = "block";
    }

    span.onclick = function() {
        sessionStorage.removeItem('email');
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            sessionStorage.removeItem('email');
            modal.style.display = "none";
        }
    }

    } 

})

}

    })}

function logOutb() {
    sessionStorage.removeItem("userL");
    sessionStorage.removeItem("passwordL");
    sessionStorage.removeItem("email");
    window.location.href = "/page6";
}
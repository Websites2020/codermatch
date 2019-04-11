function loadTourist() {

    var tuser = sessionStorage.getItem("user");
    var tpass = sessionStorage.getItem("password");

    $.post("/matchTourist", {usrName: tuser, usrPass: tpass}, function(data){
        // console.log(data[0])
        if (data[0].username===tuser && data[0].password===tpass) {

    $("#tLoad").append(
        `<div class="row">
                <div class="col-md-12">
                    <header>
                    <nav class="navbar">
                        <span class="title"><h1>CoderMatch DC</h1></span>
                            <ul class="nav justify-content-end">
                                <li class="nav-item">
                                    <a class="nav-link" onclick="logOut()" href="#">Log Out</a>
                                </li>
                                <!-- <div id="google_translate_element"></div> -->
                            </ul>
                    </nav>
                    </header>
                </div>
            </div>
            <br>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 style="text-align: center">Hello ${data[0].username}.  You are logged in as a Business Owner</h2>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-md-5">
                <h3>Create a New Web Project</h3>
    <!-- <form onsubmit="store()"> -->
    <form style="font-size: 18px;" onsubmit="tourReq()" action="/insertAcc" method="POST">
        Username: <span class="helperText2">(not publicly displayed)</span><br>
        <input style="font-size: 18px;" id="user" type="text" name="user" value=${data[0].username} readonly><br><br>
        <b>About Your Business:</b><br>
        <textarea style="font-size: 18px;" id="description" class="large-text-box" type="text" cols="32" rows="10" name="description" maxlength="499" placeholder="Ex: Vist museums, eat lunch at a local cafe, see street art." required></textarea><br><br>
        <b>Project Details:</b><br>
        What do you want to see/do on your tour?<br>
        <textarea style="font-size: 18px;" id="description" class="large-text-box" type="text" cols="32" rows="10" name="description" maxlength="499" placeholder="Ex: Vist museums, eat lunch at a local cafe, see street art." required></textarea><br><br>
        <b>Project Deadline:</b><br>
        <input style="font-size: 18px;" id="date" type="date" name="date" required><br><br>
        <b>Contact Email:</b><br>
        <input style="font-size: 18px;" id="email" type="email" name="email" maxlength="99" required><br>
        Budget<br>
        <input style="font-size: 18px;" id="offer" type="number" name="budget" min="1" max="99999" required><span class="helperText2">(in visting country's currency)</span><br><br>
        <!-- <button type="button" onclick="store()">Submit</button> -->
        <input class="btn btn-info" type="submit" value="Submit">
    </form>
            </div>
            <div class="col-md-7">
            <h3>Your Active Web Projects</h3>
            <br>
            <div id="touristListings"></div>
            </div>
        </div>
    </div>
    <footer><hr>&nbsp;CoderMatch DC &copy; 2018<span class="ourEmail">Questions, Comments, Help? Contact: codermatch.dc@gmail.com</span></footer>`
    )

    $.post("/showTAcc", {usrID: data[0].userID}, function(data2, status){
        // console.log("getdata2 works")
        // var arr = JSON.parse(data2);
        var arr = data2;
        // console.log(data2);
        for (var i=0; i<arr.length; i++)
    {
        $("#touristListings").append(`
        <div style="box-shadow: 10px 10px grey;" class="card border-primary">
        <h5 style="color: white" class="card-header bg-primary">${arr[i].tourID}</h5>
        <div class="card-body">
        <div style="list-style-type: none;" class="card-text">
        <p><b>Project Description:</b> ${arr[i].description}<br><b>About Us:</b> ${arr[i].people}<br><b>Deadline: <span class="helperText">(YYYY/MM/DD)</span></b> ${arr[i].date}<br><b>Budget:</b> ${arr[i].budget}<br><b>Email:</b> ${arr[i].email}</p>
        </div>
        <button id='deleteBtn${arr[i].tourID}' value='${arr[i].tourID}' class="btn btn-danger">Delete</button>
        </div>
        </div>
        <br>
        `);

        var deleteBtn = document.getElementById(`deleteBtn${arr[i].tourID}`);
        deleteBtn.onclick = function() {
            // console.log(this.value)
            $.post("/deleteListing", {tourID: this.value}, function(data3, status){
                // console.log(data3)
                window.location.href = "/page9"
            })
        }

}}) // end showTAcc

        } // end if statement
        else {
            $("#tLoad").prepend(`<div class="container">
            <div class='row'>
            <div class="col-md-12">
            <h1>User account unidentifiable.  Please enable cookies</h1>
            <a href="/">Home</a>
            </div>
            </div>
            </div>`)
        } // end else statement

    }) // end matchTourist post

}  // end loadTourist function

function logOut() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("password");
    window.location.href = "/page5";
}
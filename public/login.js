function addUser() {

var usrData = document.querySelector('input[name="account"]:checked').value;
// console.log(usrData)

if (usrData === "1") {
        var user=$("#usrName").val();
        var email=$("#usrEmail").val();
        var pass=$("#usrPass").val();
        $.post("/addTourist",{usrName: user,usrEmail: email, usrPass: pass}, function(data){
          // console.log(data.affectedRows)
          if(data.affectedRows === 0) {
            window.location.href='/page8'
          } else {
          window.location.href='/page7'
          }
        });
} else if (usrData === "2") {
        var user=$("#usrName").val();
        var email=$("#usrEmail").val();
        var pass=$("#usrPass").val();
        $.post("/addLocal",{usrName: user,usrEmail: email, usrPass: pass}, function(data){
            // console.log(data.affectedRows)
            if(data.affectedRows === 0) {
              window.location.href='/page8'
            } else {
            window.location.href='/page7'
            }
        });
}
alert("thank you")
}


function touristLog() {
  var user=$("#tUsrName").val();
  var pass=$("#tUsrPass").val();
  $.post("/torLogin", {usrName: user, usrPass: pass}, function(data){
    // console.log(user);
    // console.log(pass);
    // var arr = JSON.parse(data);
    var arr = data
    for (i = 0; i < arr.length; i++) {
    // console.log(arr[i].username);
    // console.log(arr[i].password);
    if (user===arr[i].username && pass===arr[i].password) {

      sessionStorage.setItem("user", arr[i].username);
      sessionStorage.setItem("password", arr[i].password);
      
      window.location.href='/page9'
    } else {
      window.location.href="/page11"
    }
    }
  })
  alert("thank you")
}

function localLog() {
  var user=$("#lUsrName").val();
  var pass=$("#lUsrPass").val();
  $.post("/locLogin", {usrName: user, usrPass: pass}, function(data){
    // console.log(user);
    // console.log(pass);
    // var arr = JSON.parse(data);
    var arr = data
    for (i = 0; i < arr.length; i++) {
    // console.log(arr[i].username);
    // console.log(arr[i].password);
    if (user===arr[i].username && pass===arr[i].password) {

      sessionStorage.setItem("userL", arr[i].username);
      sessionStorage.setItem("passwordL", arr[i].password);

      // window.location.href='/page10'
      window.location.href='/page10'
    } else {
      window.location.href="/page12"
    }
    }
  })
  alert("thank you")
}
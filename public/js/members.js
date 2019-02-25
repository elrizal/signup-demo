$(document).ready(function() {
    $.get("/api/user_data").then(function(data){
        console.log(data);
        $(".member-name").text(data.email);
        $("#member-photo").attr("src", data.photo);
        $("#degreeinfo").attr("src", data.degreeinfo);
    })
})
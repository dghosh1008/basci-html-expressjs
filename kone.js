$(document).ready(function() {
  $('#example').DataTable({
    ajax: 'http://localhost:3000/getAllUser',
    columns: [
      {
        data: 'UserID'
      },
      {
        data: 'name'
      },
      {data: 'email'},
      {data: 'address'},
      {data: 'inputcity'},
      {data: 'inputstate'},
      {data: 'inputzip'}
    ]
  });
} );

$("#singup-form").submit(function (event) {
    console.log('Called-->');
    // cancels the form submission
    event.preventDefault();
  
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#inputEmail4").val();
    var password = $("#inputPassword4").val();
    var address = $("#inputAddress").val();
    var city = $("#inputCity").val();
    var state = $("#inputState").val();
    var zip = $("#inputZip").val();

    // console.log('Name--->', name);
    // console.log('email--->', email);
    // console.log('password--->', password);
    // console.log('address--->', address);

    var formSubmitData = {
        name,
        email,
        password,
        address,
        city,
        state,
        zip
    };
    console.log('Final data-->', formSubmitData);
    var request = $.ajax({
        url: "http://localhost:3000/insertData",
        type: "POST",
        data: JSON.stringify(formSubmitData),
        contentType: 'application/json',
        dataType: "json"
      });
      
      request.done(function(msg) {
        $("#singup-form")[0].reset()
       alert(msg.message);
      });
      
      request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
      });

    
  });
  
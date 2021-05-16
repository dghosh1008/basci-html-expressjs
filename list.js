$(document).ready(function () {
  // Render all data
  $('#example').DataTable({
    ajax: 'http://localhost:3000/getAllUser',
    columns: [{
        data: 'UserID'
      },
      {
        data: 'name'
      },
      {
        data: 'email'
      },
      {
        data: 'address'
      },
      {
        data: 'inputcity'
      },
      {
        data: 'inputstate'
      },
      {
        data: 'inputzip'
      },
      {
        data: null,
        className: "dt-center editor-edit",
        render: function (data, type, row) {
          return `<a href="javascript:void(0);" onclick="editData(${data.UserID}, ${row})"><i class="fa fa-pencil"/></a>`
        },
        orderable: false
      },
      {
        data: null,
        className: "dt-center editor-delete",
        // defaultContent: '<a href="javascript:void(0);"><i class="fa fa-trash"/></a>',
        render: function (data, type, row, meta) {
          return `<a href="javascript:void(0);" onclick="deleteData(${data.UserID}, ${meta.row})"><i class="fa fa-trash"/></a>`
        },
        orderable: false
      }
    ]
  });
});

const editData = (userId, tableRow) => {
  console.log('Userid-->', userId);
}

const deleteData = (userId, tableRow) => {
  if (confirm('Are you sure you want to delete this')) {
    // call delete api here
    console.log('Userid to be deleted-->', userId, ' --->Table row: ', tableRow);
    var request = $.ajax({
      url: "http://localhost:3000/deleteUserById/" + userId,
      type: "DELETE",
      contentType: 'application/json',
      dataType: "json"
    });

    request.done(function (msg) {
      $('#example').DataTable()
        .rows(tableRow).remove()
        .draw(false);
      alert(msg.message);
    });

    request.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  }
}
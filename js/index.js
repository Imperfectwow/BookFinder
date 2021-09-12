$(document).ready(function () {
  let item, tile, bookLink, bookImg, description;
  let outputList = document.getElementById("list-output");
  let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  let apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
  let placeHldr = '<img src="https://via.placeholder.com/150">';
  let searchData;

  //listener for search button
  $("#search").click(function () {
    outputList.innerHTML = ""; //empty html output
    document.body.style.backgroundImage = "url('')";
    searchData = $("#search-box").val();
    //handling empty search input field
    if (searchData === "" || searchData === null) {
      displayError();
    } else {
      // console.log(searchData);
      // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
      $.ajax({
        url: bookUrl + searchData,
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response.totalItems === 0) {
            alert("no result!.. try again");
          } else {
            $("#title").animate({ "margin-top": "5px" }, 1000); //search box animation
            $(".book-list").css("visibility", "visible");
            displayResults(response);
          }
        },
        error: function () {
          alert("Something went wrong.. <br>" + "Try again!");
        },
      });
    }
    $("#search-box").val(""); //clearn search box
  });

  /*
   * function to display result in index.html
   * @param response
   */
  function displayResults(response) {
    for (let i = 0; i < response.items.length; i += 2) {
      item = response.items[i];

      title1 = item.volumeInfo.title;
      description1 = item.volumeInfo.description;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn = item.volumeInfo.industryIdentifiers[0].identifier;
      bookImg1 = item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : placeHldr;

      item2 = response.items[i + 1];
      title2 = item2.volumeInfo.title;

      description2 = item2.volumeInfo.description;
      console.log(description2);
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      bookLink2 = item2.volumeInfo.previewLink;
      bookIsbn2 = item2.volumeInfo.industryIdentifiers[0].identifier;
      bookImg2 = item2.volumeInfo.imageLinks
        ? item2.volumeInfo.imageLinks.thumbnail
        : placeHldr;

      outputList.innerHTML +=
        '<div class="row mt-4">' +
        formatOutput(bookImg1, title1, description1, bookLink1, bookIsbn) +
        formatOutput(bookImg2, title2, description2, bookLink2, bookIsbn2) +
        "</div>";
    }
  }

  /*
   * card element formatter using es6 backticks and templates (indivial card)
   * @param bookImg title author publisher bookLink
   * @return htmlCard
   */
  function formatOutput(bookImg, title, bookIsbn, description) {
    // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
    let viewUrl = "book.html?isbn=" + bookIsbn; //constructing link for bookviewer
    let htmlCard = `<div class="col-lg-6">
         <div class="card" style="">
           <div class="row no-gutters">
             <div class="col-md-4">
               <img src="${bookImg}" class="card-img" alt="...">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">Description: ${description}</p>
                
                 <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
               </div>
             </div>
           </div>
         </div>
       </div>`;
    return htmlCard;
  }

  //handling error for empty search box
  function displayError() {
    alert("search term can not be empty!");
  }
});

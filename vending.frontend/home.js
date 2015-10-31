function changeBGImage(whichImage)
{
     document.getElementById('page_body').className="bg"+whichImage;
     console.log("done");
}


function changeImage() {

  var el = document.getElementById("vidDiv")
  el.style.backgroundImage = "url(.//assets/images/main.png)";
  console.log("done");
}

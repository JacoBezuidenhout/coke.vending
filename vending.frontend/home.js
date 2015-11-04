
/*function changeImage() {

  var el = document.getElementById("vidDiv")
  el.style.backgroundImage = "url(.//assets/images/videobackground.png)";
  console.log("done");
}*/


function changeBackgroundImg(imgName)
{
  if(imgName != "")
  {
    document.getElementById("vidDivImg").src=".//assets/images/"+imgName+".png";
    console.log("Background image changed");
  }
  else
  {
    document.getElementById("vidDivImg").src="";
    console.log("Background image changed");
  }
}


function changeSmileyOne(imgName)
{
  if(imgName != "")
  {
  document.getElementById("smileyOne").src=".//assets/images/"+imgName+".png";
  console.log("Smiley one changed");
  }
  else
  {
    document.getElementById("smileyOne").src=".//assets/images/clear.png";
    console.log("Background image changed");
  }
}

function changeSmileyTwo(imgName)
{
  if(imgName != "")
  {
    document.getElementById("smileyTwo").src=".//assets/images/"+imgName+".png";
    console.log("Smiley two changed");
  }
  else
  {
    document.getElementById("smileyTwo").src=".//assets/images/clear.png";
    console.log("Background image changed");
  }
}

function changePhraseOne(phrase)
{
  document.getElementById("phraseOne").innerHTML = phrase;
  console.log("Phrase one changed");
}

function changePhraseTwo(phrase)
{
  document.getElementById("phraseTwo").innerHTML = phrase;
  console.log("Phrase two changed");
}

function changeTeamName(phrase)
{
  document.getElementById("teamName").innerHTML = phrase;
  console.log("Team name changed");
}


function startScreen(teamname, sOne, sTwo, pOne, pTwo)
{
  changeBackgroundImg("main");
  changeTeamName(teamname);
  changeSmileyOne(sOne);
	changeSmileyTwo(sTwo);
	changePhraseOne(pOne);
	changePhraseTwo(pTwo);
}

function videoScreen()
{
  changeBackgroundImg("videobackground");
  changeTeamName("");
}

function takeImage(cb)
{
  // changeBackgroundImg("awesome");

  setTimeout(function()
  {
    changeBackgroundImg("snapThreePlain");
    setTimeout(function()
      {
        changeBackgroundImg("snapThree");
        setTimeout(function()
        {
          changeBackgroundImg("snapTwoPlain");
          setTimeout(function()
          {
            changeBackgroundImg("snapTwo");
            setTimeout(function()
            {
              changeBackgroundImg("snapOnePlain");
              setTimeout(function()
              {
                changeBackgroundImg("snapOne");
                setTimeout(function()
                {
                  console.log("Photo was taken");
                  changeBackgroundImg("");
                  takeSnapshot();
                  clearScreen();
                  changeBackgroundImg("done");
                  cb();
                }, 500);
              }, 1000);
            }, 500);
          }, 1000);
        }, 500);
      }, 1000);
  }, 1000);
}


function clearScreen()
{
  changeBackgroundImg("");
  changeSmileyOne("");
  changeSmileyTwo("");
  changePhraseOne("");
  changePhraseTwo("")
  changeTeamName("")
}

function playSound(soundFile)
{
  var audio = new Audio(".//assets/audio/" + soundFiles[soundFile]);
  audio.play();
  console.log("Played sound");
}

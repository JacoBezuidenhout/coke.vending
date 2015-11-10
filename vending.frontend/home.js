
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

function changeCounter(imgName)
{
  if(imgName != "")
  {
    $("#vidDivCounter").show();
    document.getElementById("vidDivCounter").src=".//assets/images/"+imgName+".png";
    console.log("Background image changed");
  }
  else
  {
    $("#vidDivCounter").hide();
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

function takeSnapshot() {
    var gui = require('nw.gui');
    var win = gui.Window.get();

    win.capturePage(function(buffer)
    {
        require('fs').writeFile('/data/ownCloud/Photos/' + currentId + '_' + new Date().toUTCString() + '.png', buffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });

    }, { format : 'png', datatype : 'buffer'} );
}

function takeImage(cb)
{
  // changeBackgroundImg("awesome");

  setTimeout(function()
  {
    changeBackgroundImg("videobackground");
    changeCounter("snapThreePlain");
    setTimeout(function()
      {
        changeCounter("snapThree");
        setTimeout(function()
        {
          playSound(["COKE2.ogg"]);
          changeCounter("snapTwoPlain");
          setTimeout(function()
          {
            changeCounter("snapTwo");
            setTimeout(function()
            {
              changeCounter("snapOnePlain");
              setTimeout(function()
              {
                changeCounter("snapOne");
                setTimeout(function()
                {
                  console.log("Photo was taken");
                  changeCounter("");
                  setTimeout(function(){
                    takeSnapshot();
                    setTimeout(function(){
                      clearScreen();
                      changeBackgroundImg("done");
                      cb();
                    },1000);
                  },500);
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

function playSound(soundFileArr)
{
  var soundFile = soundFileArr[Math.floor(Math.random()*soundFileArr.length)];
  var audio = new Audio(".//assets/audio/" + soundFile); 
  audio.play();
  console.log("Played sound");
}

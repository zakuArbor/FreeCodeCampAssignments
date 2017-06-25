# FreeCodeCampAssignments
A repository for my FreeCodeCamp work

<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/tribute">Tribute</a></p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/profile">Profile</a></p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/randomQuoteGenerator">Random Quote Generator</a></p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/weather">Weather</a></p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/wikiViewer/">Wikipedia Viewer</p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/twitchTv/">Twitch TV</p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/calculator/">Calculator</p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/pomodoroClock/">Pomodoro Clock</p>
<p><a href = "http://juhongkim.tk/FreeCodeCampAssignments/ticTacToe/">Tic Tac Toe</p>
<p>
<h1><u>NOTES</u></h1>
<h2>Weather</h2>
<ul>
<li>Still under testing for time and season system (changing background images based on time and season)</li>
<li><s>Very slow especially on mobile devices (still a bit slow after the speed update)</s>A second or two load on any major devices</li>
<li><s>Geolocation does not support Chrome version 50 and over if not in https</s>[FIXED]</li>
<li><s>Weather not loading on Firefox anymore. Seems like an issue on Fireox side since all websites using geolocation does not seem to work</s>Switch on method of getting the user location[RESOLVED] </li>
<li><s>Weather not loading on Firefox anymore due to Firefox unable to retrieve geo coordinates after Firefox new update. Suspecting Firefox's new implementation on Strict Secure Cookies</s>[RESOLVED]]Reverted to HTML5 geolocation</li>
<li>[May 21 2017] Weather does not work on Firefox again</li> 
</ul>
</p>
<h2>Simon Game</h2>
<ul>
<li>REPORTED BUG 1: When player clicks two buttons very fast, creates a weird echo noise[RESOLVED]</li>
<li>BUG 2: When player spams start continously, the program creates a weird echo noise due to the sounds from the previous game has not ended [Fixed]</li>
<li>BUG 2: When game is on strict mode, if player continously press the wrong key very fast to get incorrect moves several times, the game will create an echo noise due to the sounds from the previous game has not ended. [Fixed]</li>
<li>Big 3: Counter increments when it's not supposed to. When game starts, if a player quickly presses a key, then the counter would increment regardless if the player plays the correct move or not[Fixed]</li>
<li>FEEDBACK: The button when clicked should only indent (add pressing animation) to the color of the button rather than then entire button itself(shaped in quater of a circle)</ul>
</p>

.header {
  letter-spacing: 10px;
  text-decoration: underline;
  margin-top: 20px;
  margin-bottom: 50px;
}

.hexagon { /*Hexagon Rectangle*/
  position: relative;
  width: 150px; 
  height: 80px;
  background-color: #64C7CC;
  margin: 43px 0;
}

.hexagon:before,
.hexagon:after { /*triangle*/
  content: "";
  position: absolute;
  width: 0;
  border-left: 75px solid transparent;
  border-right: 75px solid transparent;
}

.hexagon:before { /*top height*/
  bottom: 100%;
  border-bottom: 43px solid #64C7CC;
}

.hexagon:after { /*Bottom height*/
  top: 100%;
  width: 0;
  border-top: 43px solid #64C7CC;
}

.center {
  margin: 0 auto;
}

.hex-text {
  position: relative;
  letter-spacing: 0.5em;
  text-decoration: underline;
  text-shadow: 5px 5px 5px;
  top: 40%;
  bottom: 50%;
}

.shadow {
  position: relative;
  top: 45px;
  width: 150px;
  height: 1px;
  background-color: grey;
  border: none;
  border-color: grey;
  box-shadow: 0px 4px 15px 8px black;
  margin: 0px auto;
}

#menu_header {
  clear: both;
  margin-top: 20px;
  letter-spacing: 10px;
  text-align: center;
  text-decoration: underline;
}
ul {
  margin: 0px auto;
}
#menu {
  position: relative;
  clear:both;
  margin: 0 auto;
  letter-spacing: 5px;
  width: 30%;
  margin: 0 auto;
 }

li:hover {
  text-decoration: underline;
  text-size: 15px;
}

.title {
  letter-spacing: 6px;
  text-decoration: underline;
}

#social_media {
  position: relative;
  margin-top: 70px;
}

#footer {
  margin: none;
  width: 100%;
}

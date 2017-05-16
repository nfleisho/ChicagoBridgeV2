var gmnm = 1;// keeps track of number of games played
var vul = [];//stores who is vulnerable by game
vul[0] = {North: true, West: true, South: true, East: true};
vul[1] = {North: false, West: false, South: false, East: false};
vul[3] = {North: true, West: false, South: true, East: false};
vul[2] = {North: false, West: true, South: false, East: true};
var playScrGlob={};

//sets up game summary. called when changing inputs
function GamStrt() {
    var num = gmnm % 4;
    var dec = document.getElementById("dec" + gmnm).value;
    var bid = document.getElementById("bid" + gmnm).value;
    var suit = document.getElementById("suit" + gmnm).value;
    var dbl = document.getElementById("dbl" + gmnm).value;
    var vulloc=vul[num];
    if (dec == "def" || bid == "def"|| suit == "def") var txtout = "<h2>Game Summary: waiting</h2>";
    else if (vulloc[dec]) var txtout = "<h2> Game Summary:"+" "+dec+" bids "+bid+" "+suit+" "+dbl+". Vulnerable. Start play.</h2>"
    else var txtout = "<h2> Game Summary:"+" "+dec+" bids "+bid+" "+suit+" "+dbl+". Start play.</h2>";
    document.getElementById("summ").innerHTML = txtout;
    return;
}


//ends game - displays outcome and shuts down inputs
function GamEnd(){
    var num = gmnm%4;
    var dec = document.getElementById("dec"+gmnm);
    var bid = document.getElementById("bid"+gmnm);
    var suit = document.getElementById("suit"+gmnm);
    var dbl = document.getElementById("dbl"+gmnm);
    var made = document.getElementById("made"+gmnm);
    var over = (made.value-6-bid.value);
    var vulloc=vul[num];
    var vulstr="";
    if (vulloc[dec.value]) vulstr="Vulnerable";
    // displays end of game summary
    if (over==0) var txtout = "<h2> Game Summary:"+" "+dec.value+" bids "+bid.value+" "+suit.value+" "+dbl.value+" "+vulstr+". Just made.</h2>";
    else if (over>0) var txtout = "<h2> Game Summary:"+" "+dec.value+" bids "+bid.value+" "+suit.value+" "+dbl.value+" "+vulstr+". Makes "+over+" over.</h2>";
    else var txtout = "<h2> Game Summary:"+" "+dec.value+" bids "+bid.value+" "+suit.value+" "+dbl.value+" "+vulstr+". Makes "+(-1*over)+" under.</h2>";
    document.getElementById("summ").innerHTML = txtout;
    // disable game inputs
    dec.disabled=true; bid.disabled=true; suit.disabled=true; dbl.disabled=true; made.disabled=true;
    if (num!=0) NxtGamStrt();
    if (num == 0) {
        document.getElementById("rndup").removeAttribute("class");
        document.getElementById("rndup").removeAttribute("style");
        document.getElementById("rndup").style.cursor="pointer";
    }
    return;
}

//if dealer vulnerable, computes game score, displays, cumulates total
function GamScrVul(){
    var num=gmnm%4;
    var suit = document.getElementById("suit"+gmnm).value;
    var dec = document.getElementById("dec"+gmnm).value;
    var bid = document.getElementById("bid"+gmnm).value;
    var dbl = document.getElementById("dbl" + gmnm).value;
    var made = document.getElementById("made"+gmnm).value;
    var over = (made-6-bid);
    if (dbl=="") {
      if (over>=0) {
      var winr="N/S";
      if (dec=="West" || dec=="East") winr="E/W";
      if (suit=="No_Trump") {var scr=40+30*(bid-1)+30*over;
        scr += 50;
        if (40+30*(bid-1)>=100) scr += 450;
        if (bid >= 6) scr += 750;
        if (bid == 7) scr+= 750;}
      if (suit=="spades" || suit=="hearts") {var scr=30*bid+30*over; 
        scr += 50;
        if (30*bid>=100) scr += 450;
        if (bid >= 6) scr += 750;
        if (bid == 7) scr+= 750;}
      if (suit=="clubs" || suit=="diamonds") {var scr=20*bid+20*over;
        scr += 50;
        if (20*bid>=100) scr += 450;
        if (bid >= 6) scr += 750;
        if (bid == 7) scr+= 750;}
    }
      else {
      var winr="E/W";
      if (dec=="West" || dec=="East") winr="N/S";
      var scr = -100*over;}
    }
    if (dbl=="doubled") {
       if (over>=0) {
       var winr="N/S";
       if (dec=="West" || dec=="East") winr="E/W";
          if (suit=="No_Trump") {var scr=80+60*(bid-1)+200*over;
            scr += 100;
            if (80+60*(bid-1)>=100) scr += 450;
            if (bid >= 6) scr += 750;
            if (bid == 7) scr+= 750;}
          if (suit=="spades" || suit=="hearts") {var scr=60*bid+200*over; 
            scr += 100;
            if (60*bid>=100) scr += 450;
            if (bid >= 6) scr += 750;
            if (bid == 7) scr+= 750;}
          if (suit=="clubs" || suit=="diamonds") {var scr=40*bid+200*over;
            scr += 100;
            if (40*bid>=100) scr += 450;
            if (bid >= 6) scr += 750;
            if (bid == 7) scr+= 750;}
      }
       else {
        var winr="E/W";
        if (dec=="West" || dec=="East") winr="N/S";
        scr = 200-300*(1+over);}     
    }
    if (dbl=="redoubled") {
      if (over>=0) {
      var winr="N/S";
      if (dec=="West" || dec=="East") winr="E/W";
          if (suit=="No_Trump") {var scr=160+120*(bid-1)+400*over;
            scr += 150;
            if (160+120*(bid-1)>=100) scr += 450;
            if (bid >= 6) scr += 750;
            if (bid == 7) scr+= 750;}
          if (suit=="spades" || suit=="hearts") {var scr=120*bid+400*over; 
            scr += 150;
            if (120*bid>=100) scr += 450;
            if (bid >= 6) scr += 750;
            if (bid == 7) scr+= 750;}
          if (suit=="clubs" || suit=="diamonds") {var scr=80*bid+400*over;
            scr += 150;
            if (80*bid>=100) scr += 450;
            if (bid >= 6) scr += 750;
            if (bid == 7) scr+= 750;}
       }
       else {
        var winr="E/W";
        if (dec=="West" || dec=="East") winr="N/S";
        scr = 400-600*(1+over); }
    }
    document.getElementById("scr"+gmnm).innerHTML = scr+"  "+winr;
     if (winr=="N/S") {
        var scrno=Number(document.getElementById("totno").innerHTML)
        scrno += parseInt(scr);
        document.getElementById("totno").innerHTML=scrno;
        var scrso=Number(document.getElementById("totso").innerHTML)
        scrso += parseInt(scr);
        document.getElementById("totso").innerHTML=scrso;
    }
    else {
        var screa=Number(document.getElementById("totea").innerHTML)
        screa += parseInt(scr);
        document.getElementById("totea").innerHTML=screa;
        var scrwe=Number(document.getElementById("totwe").innerHTML)
        scrwe += parseInt(scr);
        document.getElementById("totwe").innerHTML=scrwe;
 }    
    GamEnd();
    return;
}

//prompt to check game entry.  procedes to score game and setup next.
function EndGame() {
    var okay = confirm("Are you sure that all of your entries for this game are correct? \nClick okay to procede to scoring and set up next game. \nClick cancel to correct entries for present game.");
    var num=gmnm%4;
    var dec = document.getElementById("dec"+gmnm);
    var vulloc = vul[num];
    if (okay==true){
        if (vulloc[dec.value]) GamScrVul();
        else GamScr();
    }    
    return;
}

//starts next game. checks vulnerability, opens inputs
function NxtGamStrt(){
    gmnm+=1;
    var num = gmnm%4;
    var vulloc = vul[num];
    var dec = document.getElementById("dec"+gmnm);
    var bid = document.getElementById("bid"+gmnm);
    var suit = document.getElementById("suit"+gmnm);
    var dbl = document.getElementById("dbl"+gmnm);
    var made = document.getElementById("made"+gmnm);
    // determine vulnerability and change label colors
    for (var item in vulloc) {
       if (vulloc[item])
            document.getElementById(item).style.color="red";
       else document.getElementById(item).style.color="black";
    } 
    // open next game inputs
    dec.style.visibility="visible";
    bid.style.visibility="visible";
    suit.style.visibility="visible";
    dbl.style.visibility="visible";
    made.style.visibility="visible";
    return;
}

//computes game score. displays in game score; cumulates total
function GamScr(){
    var num=gmnm%4;
    var suit = document.getElementById("suit"+gmnm).value;
    var dec = document.getElementById("dec"+gmnm).value;
    var bid = document.getElementById("bid"+gmnm).value;
    var made = document.getElementById("made"+gmnm).value;
    var dbl = document.getElementById("dbl" + gmnm).value;
    var over = (made-6-bid);
    if (dbl=="") {
      if (over>=0) {
      var winr="N/S";
      if (dec=="West" || dec=="East") winr="E/W";
          if (suit=="No_Trump") {var scr=40+30*(bid-1)+30*over;
            scr += 50;
            if (40+30*(bid-1)>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
          if (suit=="spades" || suit=="hearts") {var scr=30*bid+30*over; 
            scr += 50;
            if (30*bid>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
          if (suit=="clubs" || suit=="diamonds") {var scr=20*bid+20*over;
            scr += 50;
            if (20*bid>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
       }
    
      else {
      var winr="E/W";
      if (dec=="West" || dec=="East") winr="N/S";
      var scr = -50*(over);}
    }
    if (dbl=="doubled") {
      if (over>=0) {
      var winr="N/S";
      if (dec=="West" || dec=="East") winr="E/W";
          if (suit=="No_Trump") {var scr=80+60*(bid-1)+100*over;
            scr += 100;
            if (80+60*(bid-1)>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
          if (suit=="spades" || suit=="hearts") {var scr=60*bid+100*over; 
            scr += 100;
            if (60*bid>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
          if (suit=="clubs" || suit=="diamonds") {var scr=40*bid+100*over;
            scr += 100;
            if (40*bid>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
      }
      else {
        var winr="E/W";
        if (dec=="West" || dec=="East") winr="N/S";
        if (over>=(-3)) var scr = 100-200*(1+over);
        else scr=500-300*(3+over);}
    }
    if (dbl=="redoubled") {
      if (over>=0) {
      var winr="N/S";
      if (dec=="West" || dec=="East") winr="E/W";
          if (suit=="No_Trump") {var scr=160+120*(bid-1)+200*over;
            scr += 150;
            if (160+120*(bid-1)>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
          if (suit=="spades" || suit=="hearts") {var scr=120*bid+200*over; 
            scr += 150;
            if (120*bid>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
          if (suit=="clubs" || suit=="diamonds") {var scr=80*bid+200*over;
            scr += 150;
            if (80*bid>=100) scr += 250;
            if (bid >= 6) scr += 500;
            if (bid == 7) scr+= 500;}
       }
       else {
        var winr="E/W";
        if (dec=="West" || dec=="East") winr="N/S";
        if (over>=(-3)) var scr = 200-400*(1+over);
        else scr=1000-600*(3+over);}
    }
    document.getElementById("scr"+gmnm).innerHTML = scr+"  "+winr;
    if (winr=="N/S") {
        var scrno=Number(document.getElementById("totno").innerHTML)
        scrno += parseInt(scr);
        document.getElementById("totno").innerHTML=scrno;
        var scrso=Number(document.getElementById("totso").innerHTML)
        scrso += parseInt(scr);
        document.getElementById("totso").innerHTML=scrso;
    }
    else {
        var screa=Number(document.getElementById("totea").innerHTML)
        screa += parseInt(scr);
        document.getElementById("totea").innerHTML=screa;
        var scrwe=Number(document.getElementById("totwe").innerHTML)
        scrwe += parseInt(scr);
        document.getElementById("totwe").innerHTML=scrwe;
 }    
    GamEnd();
    return;
}

//called after each round. tracks all players and cumulative scores. displays table
function fillPlayScrGlob() {
    var players= [document.getElementById('no').value,document.getElementById('we').value,document.getElementById('so').value,document.getElementById('ea').value];
    var scores=[parseInt(document.getElementById('totno').innerHTML),parseInt(document.getElementById('totwe').innerHTML),parseInt(document.getElementById('totso').innerHTML),parseInt(document.getElementById('totea').innerHTML)];
    for (var j=0;j<4;j++){
        if (players[j] in playScrGlob) playScrGlob[players[j]]+=scores[j];
        else if (players[j]!="" && !(players[j] in playScrGlob)) playScrGlob[players[j]]=scores[j];
            }
    playScrTabFill();
    document.getElementById("playScrHead").style.display="block";
    document.getElementById("playScrTab").style.display="block";
    return;
}

//fills table with player names and scores
function playScrTabFill() {
    var text="";
    for (item in playScrGlob){
        text+="<tr><td>"+item+"</td><td>"+playScrGlob[item]+"</td></tr>";
    }
    document.getElementById("playnScr").innerHTML=text;
return;
}
//called at initial load and after round. loads grid
function createGameGrid() {
 var tmpTrns={AA:gmnm,BB:gmnm+1,CC:gmnm+2,DD:gmnm+3};
 var tmpGrid=document.getElementById("gametemp").innerHTML
 for (var item in tmpTrns){
     srreg=new RegExp(item,"g")
     var nuGrid=tmpGrid.replace(srreg,tmpTrns[item]);
     tmpGrid=nuGrid;
 }
 var nuDiv=document.createElement("div");
 nuDiv.setAttribute("class","table-responsive");
 nuDiv.style.margin="50px 0 0 0";
 nuDiv.innerHTML=tmpGrid;
 var postDiv=document.getElementById("summ");
 var wrap=document.getElementById("bigdiv");
 wrap.insertBefore(nuDiv,postDiv);
return;
}

//working...
function nuRound(){
    gmnm+=1;
    fillPlayScrGlob();
    document.getElementById("no").value="";
    document.getElementById("North").style.color="black";
    document.getElementById("totno").innerHTML="000";
    document.getElementById("we").value="";
    document.getElementById("West").style.color="black";
    document.getElementById("totwe").innerHTML="000";
    document.getElementById("so").value="";
    document.getElementById("South").style.color="black";
    document.getElementById("totso").innerHTML="000";
    document.getElementById("ea").value="";
    document.getElementById("East").style.color="black";
    document.getElementById("totea").innerHTML="000";
    createGameGrid();
    document.getElementById('summ').innerHTML="<h2>Game Summary:</h2>"
    document.getElementById("rndup").style.color="red";
    document.getElementById("rndup").setAttribute("class","btn disabled");
    return;
}


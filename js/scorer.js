var counter = {
	
	"red_auto_mob": 0, 
	"red_auto_diamond_depo": 0, "red_auto_ore_depo": 0, "red_auto_diamond_ref": 0,  "red_auto_ore_ref": 0,
	"red_tele_diamond_depo": 0, "red_tele_ore_depo": 0, "red_tele_diamond_ref": 0,  "red_tele_ore_ref": 0,
	
	
	"blue_auto_mob": 0, 
	"blue_auto_diamond_depo": 0, "blue_auto_ore_depo": 0, "blue_auto_diamond_ref": 0,  "blue_auto_ore_ref": 0,
	"blue_tele_diamond_depo": 0, "blue_tele_ore_depo": 0, "blue_tele_diamond_ref": 0,  "blue_tele_ore_ref": 0,

	"red_endgame_climb": 0, "red_endgame_park": 0,
	"blue_endgame_climb": 0, "blue_endgame_park": 0, 

	"red_foul": 0, "red_tech_foul": 0,
	"blue_foul": 0, "blue_tech_foul": 0,
	

 
};
pos = "blue1";
lastTeamNum = 0;
scoreConfirm = false;

var RadioGroups = {
	"Endgame1":[-1,[]],
	"Endgame2":[-1,[]],
	"Endgame3":[-1,[]]
	
}

function ResetRadio( init = false){
	
	var RadioBtns = [];
	var groups = ["BlueEndgame","RedEndgame"];
	
	RadioGroups["Endgame1"][0] = -1;
	RadioGroups["Endgame2"][0] = -1;
	RadioGroups["Endgame3"][0] = -1;
	
	
	//itterates through each child of 'groups' and adds any child with 'RadioGroup' attribute to 'RadioBtns'
	groups.forEach((element,index) => {
		var list = document.getElementById(element).children
		for(let i=0; i<list.length; i++){
			if (list[i].hasAttribute("RadioGroup")){
				RadioBtns.push(list[i]);
			}
		}
	});

	RadioBtns.forEach((element,index) => {
		if (init)
			RadioGroups[element.getAttribute("RadioGroup")][1].push(element);
		element.style.backgroundColor = "#666"; //initial color
	})
}

$(document).ready(function () {
	ResetRadio(true);
	
    //set interval causes a function to run every given miliseconds (in this case 500)
    setInterval(function () {
        if ($("#position_select").val().includes('red')) {
            $("#RedSide").show();
            $("#BlueSide").hide();
			//document.body.style.backgroundColor = "#F77";
			document.getElementById("main").style.backgroundColor = "#F77";
			//$('.main2').css('background','#F77')
        } else {
            $("#RedSide").hide();
            $("#BlueSide").show();
			//document.body.style.backgroundColor = "#7af";
			document.getElementById("main").style.backgroundColor = "#7af";
			//$('.main2').css('background','#7af')
        }

        //this is a jQuery function to send a HTTP request
        $.ajax(
            {

                //give the url to go to (the .. means go up a folder)
                url: './php/GetTeamNumber.php',
                data: { 'position': $("#position_select").val() },
                type: 'POST',
                //this says what todo as soon as all the data has been loaded
                success: function (data) {
                    console.log(data);
                    if (lastTeamNum != parseInt(data)) {
                        //clear data
                        for (id in counter) {
                            counter[id] = 0;
                            console.log(id);
                            var ele = document.getElementById(id +"Counter")
							if(ele) ele.innerHTML = 0;

                        }
                    }
                    lastTeamNum = parseInt(data);
                }

            });

    }, 500);
});


$("#Confirm").click(function () {toggleConfirm(); })

function toggleConfirm(){
	scoreConfirm = !scoreConfirm;
	if(scoreConfirm){
		document.getElementById("Confirm").style.backgroundColor = "#5f5";
	}else{
		document.getElementById("Confirm").style.backgroundColor = "#555";
	}
	
	var data = {};
	switch($("#position_select").val().slice(0, -1)){ //gets blue/red of scorer dropdown
		case "red":
			data = { "red_confirm": scoreConfirm? 1:0 };
		break;
		case "blue":
			data = { "blue_confirm": scoreConfirm? 1:0 };
		break;
	}
	$.ajax({
		url: "./php/updateStatus.php",
		type: "POST",
		data: data,
		success: function (data) {
			console.log(data);
		}
	});
}

$("#reset").click(function () {
	soreConfirm = false;
    for (id in counter) {
        counter[id] = 0;
		var dom =  document.getElementById(id + "Counter");
		if(dom)
			dom.innerHTML = 0;

    }
	
	ResetRadio();
	if(scoreConfirm) 
		toggleConfirm();
});

function add(ele) {
    var id = ele.id;
    id = id.replace("AddButton", "");
    counter[id]++;
    var max = ele.getAttribute("max");
    if (max != null) {
        if (counter[id] > parseInt(max)) {
            counter[id] = max;
        }
    }
    document.getElementById(id + "Counter").innerHTML = counter[id];
    sendScore(id);
}

function sub(ele) {
    var id = ele.id;
    id = id.replace("SubButton", "");
    counter[id]--;
    var min = ele.getAttribute("min");
    if (min != null) {
        if (counter[id] < parseInt(min)) {
            counter[id] = min;
        }
    }
    document.getElementById(id + "Counter").innerHTML = counter[id];
    sendScore(id);
}


	
function RadioClick(ele){
	var myGroup = RadioGroups[ele.getAttribute("RadioGroup")]
	//console.log(ele.getAttribute("RadioGroup"))
	//console.log(myGroup)
	if (myGroup[0] != -1){ //dont try and mess with last index if last is -1
		if (myGroup[1][myGroup[0]] == ele){ //if selected button is the same
			return
		}
	
		
		oldButton = myGroup[1][myGroup[0]]; //prev selected button
		//console.log(oldButton)
		oldButton.style.backgroundColor = "#666"; //un-selected color
		
		if(oldButton.id != "_"){ //ignore if previous selection is '_' id
			counter[oldButton.id]-- //decrement previously selected button's counter
			if(counter[oldButton.id] <0 ) counter[oldButton.id] = 0;
			sendScore(oldButton.id); 
		}
	
	}
	//console.log(ele)
	
	myGroup[1].forEach(
	(element,index) => {
		//console.log(element)
		if (element == ele) {
			myGroup[0] = index; //sets new selected index
			element.style.backgroundColor = "#3f3"; //selected color
			counter[element.id]++; //increment newly selected button's counter
			return;
		}
	});
	
	if(ele.id != "_")
	{
		sendScore(ele.id);
	}
}

function checkChange(ele) { //unused
    counter[ele.id] = ele.checked ? 1 : 0;
    sendScore(ele.id);
}

function sendScore(id) {
    var alliance = $("#position_select").val().slice(0, -1);

   // var key = alliance + "_" + id;
	var key = id
	 $.ajax({
            //give the url to go to (the .. means go up a folder)
            url: './php/GetStatus.php',

            //this says what todo as soon as all the data has been loaded
            success: function (data) {
				var info2 = $.parseJSON(data);
				console.log(info2['score_lock']);
				if(info2["score_lock"]=='0'){
					var vals = { [key]: counter[id] };
					$.ajax({
						//give the url to go to (the .. means go up a folder)
						url: './php/sendScore.php',
						data: vals,
						type: 'POST',
						//this says what todo as soon as all the data has been loaded
						success: function (info) {
							console.log(info);
						}

					});
				}
			}
	 });
    
}

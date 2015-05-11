// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

if(window.location.pathname.indexOf("android_asset")>-1){
	$$("body").css({"zoom": "90%"});
}else{
	$$("body").css({"zoom": "130%"});
}
function setop(){
	httpd.stopServer(function(){
		myApp.closeModal();
	},function( error ){
		alert("Error Stoping server :( plz killme");
	});
}
function gotos(url){
	window.open(url, "_system", "location=no");
	//navigator.app.loadUrl(url, { openExternal:true });
}
function qrgen(txt){
	var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 100,
	height : 100
	});
	qrcode.makeCode(txt);
}
function start(port, pwd, local){
	httpd.startServer({
		'www_root' : pwd,
    	'port' : Number(port),
    	'localhost_only' : local
	}, function (url){
		if (!url.match(/\/\/(127|192)/)){
			url="http://localhost:"+url.split(":")[2];
		}
		window.notif=myApp.modal({
		title: "Server Dijalankan",
		text: "<div align='center' id='qrcode'></div>Listen on "+url+"<br><a onclick='gotos(\""+url+"\")' class='button button-fill color-blue' target='_blank' data-rel='external'>Buka Browser</a>"+
		"<a href='#' onclick='setop()' class='button button-fill color-red ngesortitik'>Matikan Server</a>",
		});
		qrgen(url);
	}, function (error){
		alert("Error "+error);
	});
}
function IsNumeric(num) {
     return (num >=0 || num < 0);
}
$$(".togel").click(function (){
	var localonly=$$(".label-switch").find("input[type=checkbox]")[0].checked;
	var port=$$("#port").val();
	var dir=$$("#dir").val();
	if (!dir){
		myApp.alert("Isi dir");
		return;
	}
	if (IsNumeric(port)){
		if(Number(port)>1023&&Number(port)<9999){
			start(port, dir, localonly);
		}else{
			myApp.alert("Masukan PORT 1024-9998");
			return;
		}
	}else{
		myApp.alert("PORT harus numerik");
	}
});

function UPLOAD()
{
    var canvas = document.getElementById('q2');
    var data = canvas.toDataURL();

    var url = document.getElementById('url');
    url.style.display="block";
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            url.href = xhr.responseText;
            url.innerHTML= "Here it is your photo";
            console.log("download: "+xhr.responseText);
        }
    };
    xhr.onerror = function () {
        url.innerHTML = "error";
    };

    xhr.open("POST", "upload.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("img=" + data);
}
function GENERATE()
{
    getimg();

}
function getimg(){
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://loremflickr.com/640/480', true);
    xhr.onload = function()
    {
        var canvas = document.getElementById('q2'),
            context = canvas.getContext('2d');
        image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = this.responseURL;
        image.onload = function()
        {
            context.drawImage(image, 0, 0);
            getext();
        }
    }
    xhr.onerror = function() {
        alert( 'No connection' );
    }
    xhr.send();
}
function getext()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sumitgohil-random-quotes-v1.p.mashape.com/fetch/randomQuote");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-Mashape-Key", "ESEVVJuBgsmshTD6vWwRSjDmF1KYp1up2uDjsnpK8niqe5k7MS");
    xhr.onload = function ()
    {
        var quote = JSON.parse(this.responseText);
        var canvas = document.getElementById("q2");
        var context = canvas.getContext("2d");
        var maxWidth = 400;
        var lineHeight = 25;
        var marginLeft = 20;
        var marginTop = 40;
        context.font = "16pt Calibri";
        context.fillStyle = "#fff";
        wrapText(context, quote[0].quote, marginLeft, marginTop, maxWidth, lineHeight);
    }
    xhr.send();
}


function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight)
{
    var words = text.split(" ");
    var countWords = words.length;
    var line = "";
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + " ";
        var testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
            context.fillText(line, marginLeft, marginTop);
            line = words[n] + " ";
            marginTop += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, marginLeft, marginTop);
}






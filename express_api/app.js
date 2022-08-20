const xml = new XMLHttpRequest();
const routes = document.getElementById("routes");

function setHtml($element, html) {
    $element.innerHTML = html;
}

function addHtml($element, html) {
    $element.innerHTML += html;
}

xml.open("GET", "http://localhost:8800/exapi");
xml.onreadystatechange = function() {
    if(xml.status == 200 && xml.readyState == 4) {
        const response = JSON.parse(xml.response);
        if(!response.length) {
            setHtml(routes, "<div class='routes'><h3 class='no-routes'>No routes yet.</h3></div>");
            return
        }
        console.log(response);

        response.forEach(route => {
            console.log(route)
            addHtml(routes, `<div className='routes'>
                                <div class='route'>
                                    <h3 class="method">${route.method}</h3>
                                    <h3 class="path">${route.path}</h3>
                                </div>
                             </div>`)
        })
    }
}

xml.send();
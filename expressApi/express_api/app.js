const xml = new XMLHttpRequest();
const routes = document.getElementById("routes");
let routePath = [];
function setHtml($node, html) {
    $node.innerHTML = html;
}

const server = window.location.href.split('/')[2];

console.log(server);
function addHtml($node, html) {
    $node.innerHTML += html;
}

xml.open("GET", "http://" + server + "/exapi");
xml.onreadystatechange = function() {
    if(xml.status == 200 && xml.readyState == 4) {
        const response = JSON.parse(xml.response);
        console.log(response);
        if(!response.length) {
            setHtml(routes, "<div class='routes'><h3 class='no-routes'>No routes yet.</h3></div>");
            return
        }
        console.log(response);

        response.forEach((route, i) => {
            console.log(route);
            routePath.push(route.path);
            addHtml(routes, `<div class='route'>
                                    <h3 class="method">${route.method}</h3>
                                    <h3 class="path">${route.path}</h3>
                                    <h3 class="responseType">(Response type: ${route.responseType})</h3>
                                    <button class="request">${route.method}</button>
                            </div>`);
        });
    }
}

xml.send();
const requestButtons = document.querySelectorAll('.request');
console.log(document.querySelectorAll('.request'));
const xml = new XMLHttpRequest();
const routes = document.getElementById("routes");
let routePath = [];
const routesList = [];
function setHtml($node, html) {
    $node.innerHTML = html;
}

const server = window.location.href.split('/')[2];
console.log(server);
function addHtml($node, html) {
    $node.innerHTML += html;
}

const responseBlock = document.querySelector('.response')

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
            routesList.push(route);
            routePath.push(route.path);
            addHtml(routes, `<div class='route'>
                                    <h3 class="method">${route.method}</h3>
                                    <h3 class="path">${route.path}</h3>
                                    <h3 class="responseType">(Response type: ${route.responseModel == undefined ? "None" : route.responseModel})</h3>
                                    <button class="request ${route.method}">${route.method}</button>
                            </div>`);
        });
        const requests = document.querySelectorAll('.request');
        requests.forEach((btn, i) => {
            btn.setAttribute('routeMethod', btn.innerHTML);
            btn.setAttribute('routepath', routesList[i].path);
            btn.addEventListener('click', () => {
                xml.open(btn.getAttribute('routeMethod'), "http://" + server + btn.getAttribute('routepath'))
                xml.onreadystatechange = () => {
                    if(xml.status === 200 && xml.readyState === 4) {
                        if(!response.length) {
                            responseBlock.innerHTML = "No response received.";
                            return;
                        }

                        responseBlock.innerHTML = `${xml.responseText}`;
                    }
                }

                xml.send();
            })
        })
    }
}
xml.send();


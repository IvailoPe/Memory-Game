let fruits = [{ image: "apple.png", fruit: "apple" }, { image: "banana.png", fruit: "banana" }, { image: "grapes.png", fruit: "grapes" }, { image: "kiwi.png", fruit: "kiwi" }, { image: "orange.png", fruit: "orange" }, { image: "peach.png", fruit: "peach" }]
let date

let boxes = [[], []]

let buffer = {}

let indexOfEvent = []
let isPairs = []

document.getElementsByTagName("p")[0].addEventListener("click", () => {
    let headDiv = document.getElementById("headDiv")
    headDiv.style.position = "absolute"
    headDiv.style.top = "50%"
    headDiv.style.left = "50%"
    headDiv.style.height = "500px"
    headDiv.style.width = "500px"
    headDiv.style.transform = "translate(-50%, -50%)"
    document.getElementsByTagName("p")[0].remove()
    renderDivPairs(makeRandomPairs())
    renderWhiteDivsAndHandleEvenets()
    date = Date.now()
    document.body.style.backgroundColor = "white"
})

function renderDivPairs(pairs) {
    for (const iterator of pairs) {
        for (const divs of iterator) {
            let img = document.createElement("img")
            img.src = divs.image
            img.style.height = "100px"
            img.style.width = "100px"
            img.style.display = "inline-block"
            img.style.margin = "10px"
            img.style.border = '1px solid #555'
            img.className = divs.fruit
            document.getElementById("headDiv").appendChild(img)
            buffer[divs.fruit] = divs.image
        }
        document.body.appendChild(document.createElement("div"))
    }
}

function makeRandomPairs() {
    for (let index = 0; index < fruits.length; index++) {
        for (let j = 0; j <= 1; j++) {
            let i = Math.floor(Math.random() * fruits.length)
            let outterOrInner = Math.floor(Math.random() * 2)
            if (boxes[outterOrInner][i] == undefined) {
                boxes[outterOrInner][i] = fruits[index]
            }
            else {
                while (boxes[outterOrInner][i] != undefined) {
                    i = Math.floor(Math.random() * fruits.length)
                    outterOrInner = Math.floor(Math.random() * 2)
                }
                boxes[outterOrInner][i] = fruits[index]
            }
        }
    }
    return boxes
}
function renderWhiteDivsAndHandleEvenets() {
    setTimeout(() => {
        let img = document.getElementsByTagName("img")
        for (const iterator of img) {
            iterator.addEventListener("click", (event) => {
                let indexOfClickedDivs = document.getElementsByClassName(event.target.className)
                for (let index = 0; index < indexOfClickedDivs.length; index++) {
                    if (indexOfClickedDivs[index] === event.target) {
                        indexOfEvent.push(index)
                    }
                }
                console.log(indexOfClickedDivs);
                if (isPairs.length === 0) {
                    console.log(event.target.alt);
                    event.target.src = buffer[event.target.className]
                    isPairs.push(event.target.className)
                }
                else if (isPairs.length > 0) {
                    console.log(event.target.alt);
                    event.target.src = buffer[event.target.className]
                    isPairs.push(event.target.className)
                    if (isPairs[0] === isPairs[1]) {
                        isPairs.length = 0;
                        indexOfEvent.length = 0
                        console.log("Pasvat");
                        isGameOver()
                    }
                    else {
                        setTimeout(() => {
                            document.getElementsByClassName(isPairs[0])[indexOfEvent[0]].src = " "
                            document.getElementsByClassName(isPairs[1])[indexOfEvent[1]].src = " "
                            isPairs.length = 0;
                            indexOfEvent.length = 0
                        }, 200)
                    }

                }
            })
            iterator.src = " "
        }
    }, 2700)
}

function isGameOver() {
    let imgs = document.getElementsByTagName("img")
    let isOver = false
    for (const iterator of imgs) {
        if (iterator.src.split(".")[iterator.src.split(".").length-1] !== "html") {
            isOver = true
        }
        else {
            isOver = false
            break;
        }
    }
    if (isOver) {
        let finaMessage = document.createElement("p")
        let time = Math.floor((Date.now() - date) / 1000)
        if(time.toString().length === 3){
            time = time.toString().split("")
            time.splice(1,0,".");
            finaMessage.innerText = `Time: ${time.join("")} minutes/seconds`
        }
        else{
            finaMessage.innerText = `Time: ${time} seconds`
        }
        finaMessage.style.textAlign = "center"
        finaMessage.style.fontSize = "30px"
        finaMessage.style.position = "relative"
        finaMessage.style.top = "65%"
        document.body.appendChild(finaMessage)
        console.log("bravo");
    }
}
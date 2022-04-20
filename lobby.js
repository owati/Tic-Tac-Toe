window.addEventListener('DOMContentLoaded',()=>{
    const host = "http://localhost:5555/"

    const create = document.querySelector('#create-game');
    const final = document.querySelector('#final-create');
    const modal = document.querySelector('.modal');
    const input = document.querySelector('input');
    const ws = new WebSocket('ws://localhost:3001/lobby');


    ws.onopen = e => {
        console.log('...connected to the lobby socket');
    }

    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = "none"
        }
    })

    ws.onmessage = e => {
        const data = JSON.parse(e.data);
        console.log(data)

        switch (data.type) {
            case "new game":
                let game_url = host + 'game.html?' + data.id
                modal.innerHTML = `
                <h2>The game link</h2>
                <a href="/game.html?${data.id}"><h3>${game_url}</h3></a>
                 `

                 modal.appendChild(final)
                final.innerHTML = "Copy Link"

                 final.onclick = function () {
                    console.log("pol");
                    navigator.clipboard.writeText(game_url);
                    alert("link copied");
                }
                break;
            default:
                console.log('Invalid type')
        }
    }

    create.onclick = e => {
        modal.style.display = "flex"
    }

    final.onclick = e => {
        if (input.value) {
            if (input.value.length < 4) {
                alert('the name must be at least characters')
            } else if (input.value.length > 20) {
                alert('the name must not be greater that four characters')
            } else {
                ws.send(JSON.stringify({
                    type : "game create",
                    name : input.value
                }))
                
            }
        } else {
            alert('the name field is empty')
        }
    }


})
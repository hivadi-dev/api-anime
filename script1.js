const inp = document.querySelector('#text')
const _main = document.querySelector('main')
const _profile = document.querySelector('.profile')
const msg = document.getElementById('message')
const backdrop = document.getElementById('backdrop')
const blurLayer = document.getElementById('blur-layer')
let page = 1
let loading = false



let textUrl = 'https://dragonball-api.com/api/characters'

async function getData(url) {
    let x = await fetch(url)
    let temp = await x.json()
    return temp
}

getData(textUrl).then(data => {
    console.log(data);
    data.items.map((val) => {
        const _div = document.createElement('div')
        _div.classList.add('box')
        _div.innerHTML = `
            <img src='${val.image}'></img>
            <h2>${val.name}</h2>
            <button class = 'moreBtn'>more info</button>
        `

        const moreBtn = _div.querySelector('button')
        moreBtn.addEventListener('click', () => {
            moreData(val.id)
        })

        _main.appendChild(_div)

    })
})


function moreData(id) {
    getData(textUrl + '/' + id).then(res => {

        const overlay = document.createElement('div')
        overlay.className = 'overlay'

        const popup = document.createElement('div')
        popup.className = 'popup'

        popup.innerHTML = `
            <h2>${res.name}</h2>
            <ul>
                <li><span>Ki</span><b>${res.ki}</b></li>
                <li><span>Race</span><b>${res.race}</b></li>
                <li><span>Gender</span><b>${res.gender}</b></li>
            </ul>
            <p>${res.description}</p>
        `

        overlay.appendChild(popup)
        document.body.appendChild(overlay)

        overlay.addEventListener('click', () => {
            overlay.remove()
        })

    })
}



//click on profile//

_profile.addEventListener('click', () => {
    blurLayer.classList.add('active')
    backdrop.classList.add('active')
    msg.classList.remove('hidden')
})

backdrop.addEventListener('click', () => {
    blurLayer.classList.remove('active')
    backdrop.classList.remove('active')
    msg.classList.add('hidden')
})


//search//

inp.addEventListener('input', () => {
    const search = inp.value.toLowerCase()
    const cards = document.querySelectorAll('.box')

    cards.forEach(card => {
        const name = card.querySelector('h2').innerText.toLowerCase()
        card.style.display = name.includes(search) ? 'flex' : 'none'
    })

})


// scroll and more data//

function loadMore() {
    if (loading) return
    loading = true
    page++

    getData(textUrl + '?page=' + page).then(data => {
        data.items.forEach(val => {
            const _div = document.createElement('div')
            _div.classList.add('box')
            _div.innerHTML = `
                <img src='${val.image}'>
                <h2>${val.name}</h2>
                <button class="moreBtn">more info</button>
            `
            _div.querySelector('button').addEventListener('click', () => moreData(val.id))
            _main.appendChild(_div)
        })
        loading = false
    })
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore()
    }
})











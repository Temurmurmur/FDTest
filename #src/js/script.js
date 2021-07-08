const images = [
  'https://images.unsplash.com/photo-1577593980495-6e7f66a54ee6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1430285561322-7808604715df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1597047084897-51e81819a499?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80',
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
]

const searchInput = document.querySelector('#search')
const appBlock = document.querySelector('#app')
const preloader = document.querySelector('#preloader')

const app = {
  init: () => {
    this.showAllPosts(this.getPosts())
    searchInput.addEventListener('input', this.search)
  },

  postItems: [],

  getPosts: this.getPosts = async () => {
    let json
    this.preloader('on')

    let response = await fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes')

    if (response.ok) {
      json = response.json()
    } else {
      throw new Error("Ошибка HTTP: " + response.status)
    }

    this.preloader('off')
    return json
  },

  showAllPosts: this.showAllPosts = async function (items) {

    items.then(
      result => {
        this.postItems = result
        for (let item of result) {
          this.appendEl(item)
        }
      })
  },

  appendEl: this.appendEl = (obj) => {
    appBlock.insertAdjacentHTML('beforeend', `
                <a href="https://603e38c548171b0017b2ecf7.mockapi.io/homes/${obj.id}" class="developments__item">
                  <div class="developments__img">
                    <img src="${images[Math.floor(Math.random() * images.length)]}" alt="">
                    <div class="developments__type ${(obj.type == 'IndependentLiving') ? 'developments__type_independent' : 'developments__type_rest'}">${obj.type}</div>
                  </div>
                  <div class="developments__content">
                    <h4 class="developments__title">${obj.title}</h4>
                    <p class="developments__address">${obj.address}</p>
                    <p class="developments__price">New Properties for Sale from <b>£${obj.price}</b></p>
                    <p class="developments__sub">Shared Ownership Available</p>
                  </div>
                </a>
          `)
  },

  search: this.search = () => {
    let findVal = searchInput.value.toLowerCase()

    let inObject = this.postItems.filter(o => !o.title.toLowerCase().indexOf(findVal))

    appBlock.innerHTML = ''
    for (let item of inObject) {
      this.appendEl(item)
    }
  },

  preloader: this.preloader = (val) => {
    if (val === 'on') {
      preloader.innerHTML = `<div id="loader"></div>`
    } else if (val === 'off') {
      preloader.innerHTML = ''
      preloader.style.display = 'none'
    }
  }
}

app.init()



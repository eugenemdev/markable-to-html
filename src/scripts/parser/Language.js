'use strict'

import LanguageConf from './Config.js'

const Language = {
  replaceLanguage: (node, language) => {
    let string = node.innerHTML
    string = string.replace(language, '')

    node.innerHTML = string
    if (language !== '') {
      node.dataset.language = language
    } else {
      node.dataset.language = '@all'
    }

    return node
  },

  detectLanguage: node => {
    // by default is english
    let language = ''

    const string = node.outerHTML

    // console.log(node.outerHTML)

    const en = string.lastIndexOf(LanguageConf.english)
    const de = string.lastIndexOf(LanguageConf.german)
    const ru = string.lastIndexOf(LanguageConf.russian)
    const all = string.lastIndexOf(LanguageConf.multi)

    if (en >= 0) language = LanguageConf.english
    if (de >= 0) language = LanguageConf.german
    if (ru >= 0) language = LanguageConf.russian
    if (all >= 0) language = LanguageConf.multi

    return language
  },

  parseLang: node => {
    const language = Language.detectLanguage(node)
    node = Language.replaceLanguage(node, language)
    return node
  },

  setLanguage: () => {
    // by default we can see english version
    let language = '@en'

    // add event listeners to languages buttons
    const english = document.getElementById('englishSelector')
    const german = document.getElementById('germanSelector')
    const russian = document.getElementById('russianSelector')

    english.addEventListener('click', function () {
      language = '@en'
      // console.log('Language changed on English')
      changeLanguage()
    })

    german.addEventListener('click', function () {
      language = '@de'
      // console.log('Language changed on German')
      changeLanguage()
    })

    russian.addEventListener('click', function () {
      language = '@ru'
      // console.log('Language changed on Russian')
      changeLanguage()
    })

    function changeLanguage () {
      /** by default multi */

      const article = document.querySelector('article')
      const articles = article.childNodes

      articles.forEach(node => {
        if (node.dataset !== undefined) {
          if (
            node.dataset.language === language ||
            node.dataset.language === '@all'
          ) {
            node.style.display = ''
          } else {
            if (node.tagName !== 'HEADER') {
              node.style.display = 'none'
            }
          }
        }
      })
    }

    // first loading
    language = '@en'
    changeLanguage()
  }
}

export default Language

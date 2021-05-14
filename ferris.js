var ferrisTypes = [{
        attr: 'does_not_compile',
        title: '这段代码无法编译!'
    },
    {
        attr: 'panics',
        title: '这段代码将触发panic!'
    },
    {
        attr: 'unsafe',
        title: '这段代码包含不安全代码.'
    },
    {
        attr: 'not_desired_behavior',
        title: '这段代码不会产生所需的行为.'
    }
]

document.addEventListener('DOMContentLoaded', () => {
    for (var ferrisType of ferrisTypes) {
        attachFerrises(ferrisType)
    }
})

function attachFerrises(type) {
    var elements = document.getElementsByClassName(type.attr)

    for (var codeBlock of elements) {
        var lines = codeBlock.textContent.split(/\r|\r\n|\n/).length - 1;

        if (lines >= 4) {
            attachFerris(codeBlock, type)
        }
    }
}

function attachFerris(element, type) {
    var img = document.createElement('img')
    img.setAttribute('src', '/img/ferris/' + type.attr + '.svg')
    img.setAttribute('title', type.title)
    img.className = 'ferris'

    element.parentElement.insertBefore(img, element)
}
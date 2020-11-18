

    var inputs = document.querySelectorAll('div.js_input');

    console.log('totooooooooo');
    document.querySelector('input[type="submit"]').onclick = function() {
        inputs.forEach((input) => {
            console.log(input);
            if (!input.children[1].value) {
                input.classList.add("invalid");
            }
        })
    }


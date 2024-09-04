const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const converter = {
    camelToSnake: (text) => text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
    snakeToCamel: (text) => text.replace(/(_\w)/g, (m) => m[1].toUpperCase())
};

function camelToSnake() {
    let camelText = document.getElementById('camelText').value;
    let snakeText = converter.camelToSnake(camelText);
    document.getElementById('snakeText').value = snakeText;
}

function snakeToCamel() {
    let snakeText = document.getElementById('snakeText').value;
    let camelText = converter.snakeToCamel(snakeText);
    document.getElementById('camelText').value = camelText;
}

function copyText(type) {
    return () => {
        let text = document.getElementById(`${type}Text`).value;
        navigator.clipboard.writeText(text).then(() => {
            let popover = new bootstrap.Popover(document.getElementById(`${type}Copy`), {content: 'Copied!'});
            popover.show();
            setTimeout(() => popover.dispose(), 2000);
        });
    };
}

document.getElementById('camelText').addEventListener('input', camelToSnake);
document.getElementById('snakeText').addEventListener('input', snakeToCamel);
document.getElementById('camelCopy').addEventListener('click', copyText('camel'));
document.getElementById('snakeCopy').addEventListener('click', copyText('snake'));

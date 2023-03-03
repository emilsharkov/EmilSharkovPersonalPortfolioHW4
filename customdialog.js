const bindAlert = (message) => {
    const alertButton = document.getElementById('alert');
    const alertDialog = document.getElementById('alert-dialog');
    const output = document.querySelector('output');
    const ok = alertDialog.querySelector('#ok-alert');
    document.getElementById('message-alert').innerHTML = message

    alertButton.addEventListener('click', () => {
        alertDialog.showModal();
    });
}

const bindConfirm = (message) => {
    const confirmButton = document.getElementById('confirm');
    const confirmDialog = document.getElementById('confirm-dialog');
    const output = document.querySelector('output');
    const ok = confirmDialog.querySelector('#ok-confirm');
    const cancel = confirmDialog.querySelector('#cancel-confirm');
    document.getElementById('message-confirm').innerHTML = message

    confirmButton.addEventListener('click', () => {
        confirmDialog.showModal();
    });

    ok.addEventListener('click', () => {
        output.value = true
    });

    cancel.addEventListener('click', () => {
        output.value = false
    });
}

const bindPrompt = (message) => {
    const promptButton = document.getElementById('prompt');
    const promptDialog = document.getElementById('prompt-dialog');
    const output = document.querySelector('output');
    const textarea = document.querySelector('textarea');
    const ok = promptDialog.querySelector('#ok-prompt');
    const cancel = promptDialog.querySelector('#cancel-prompt');
    document.getElementById('message-prompt').innerHTML = message

    promptButton.addEventListener('click', () => {
        promptDialog.showModal();
    });

    ok.addEventListener('click', () => {
        output.innerHTML = 'The value returned by the confirm method is : ' + DOMPurify.sanitize(textarea.value)
    });

    cancel.addEventListener('click', () => {
        output.innerHTML = 'User Didn\'t Enter Anything'
    });
}

export { bindAlert, bindConfirm, bindPrompt }
$(document).ready(function () {

    const isEmail = (email) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

    const required = val => val || val.legnth;
    const minLength = len => val => required(val) && val.length >= len;
    const maxLength = len => val => required(val) && val.length <= len;

    onForSubmit();

    const formProps = {
        name: {
            type: 'text', reqired: true,
            validators: [required, minLength(3), maxLength(40)], errMsg: 'Length from 3 to 40'
        },
        email: {
            type: 'text', reqired: true,
            validators: [isEmail], errMsg: 'Enter valid email'
        },
        message: { type: 'text' }
    };

    function onForSubmit(event) {
        if (event)
            event.preventDefault();

        let isValidForm = true;

        $(this).serializeArray().forEach(({ name, value }) => {
            const isValid = validate(name, value);
            isValidForm = isValidForm && isValid;
            const errMsg = formProps[name].errMsg;
            handleValidity(name, value, isValid, errMsg, null);
        });

        const body = $(this).serializeArray().reduce((acc, { name, value }) => { acc[name] = value; return acc; }, {});
        console.log(body);

        if (isValidForm && Object.keys(body).length)
            sendPostRequest('http://kubanutyi.herokuapp.com/api/v1', body);
    }

    $('#form').submit(onForSubmit);

    function validate(name, value) {
        const props = formProps[name];
        if (!props.validators)
            return true;

        switch (props.type) {
            case 'text': return props.validators.every(validator => validator(value.toString()));
            default: return true
            // case 'number': @todo 
        }
    }

    function handleValidity(name, value, isValid, errorString, successString) {
        const feedbackEl = $(`[name="${name}"] + .invalid-feedback`);
        feedbackEl.text(isValid ? '' : errorString);
    }

    function sendPostRequest(url, body) {
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(body),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });;
    }

});
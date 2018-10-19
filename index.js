let principal = '0';
let secundario = '';
let operador = '';
let calculado = 0;
let novovalor = true;

$(document).ready(function () {
    escrever();

    $(".numero").on('click', numero_click);
    $(".virgula").on('click', virgula_click);
    $(".operador").on('click', operador_click);
    $(".limpar").on('click', limpar_click);
    $(".reiniciar").on('click', reiniciar_click);
    $(".remover").on('click', remover_click);
    $(".igual").on('click', igual_click);
    $(".mudarsinal").on('click', mudarsinal_click);
});

$(document).on('keydown', function (e) {
    if (e.key == 'Backspace') {
        $(".remover")[0].click();
    }
});

$(document).on('keypress', function (e) {
    if ("0123456789".includes(e.key)) {
        $("#" + e.key).click();
    } else {
        switch  (e.key) {
            case '+': $("#somar").click(); break;
            case '-': $("#subtrair").click(); break;
            case '*': $("#multiplicar").click(); break;
            case '/': $("#dividir").click(); break;
            case ',': $("#virgula").click(); break;
            case 'Enter': $("#igual").click(); break;
        }
    }
});

$(document).ready(function() {
    $('button').focus(function() {
        this.blur();
    });
});

function mudarsinal_click() {
    let valor = Number(principal.replace(',', '.'));
    principal = (valor * -1).toString().replace('.', ',');
    escrever();
}

function igual_click() {
    calcular();
    secundario = '';
    operador = '';
    calculado = 0;
    novovalor = true;
    escrever();
}

function remover_click() {
    principal = principal.substr(0, principal.length - 1);
    if (principal.length == 0) {
        principal = '0';
        novovalor = true;
    }
    escrever();
}

function reiniciar_click() {
    principal = '0';
    secundario = '';
    operador = '';
    calculado = 0;
    novovalor = true;
    escrever();
}

function limpar_click() {
    principal = '0';
    novovalor = true;
    escrever();
}

function escrever() {
    $("#principal").html(principal.toString());
    $("#secundario").html(secundario);
}

function numero_click() {
    let numero = $(this).html();
    if (novovalor == true)
        principal = numero;
    else
        principal = "".concat(principal, numero);
    novovalor = false;
    escrever();
}

function virgula_click() {
    if (principal.includes(',') == false) {
        principal = "".concat(principal, ',');
        escrever();
    }
}

function operador_click() {
    if (principal == '0' && novovalor == true) {
        operador = $(this).html();
        if (secundario.includes(' ') == true) {
            let ultimooperador = secundario.split(' ').pop();
            secundario = secundario.substr(0, secundario.length - 1) + operador;
        }
    }
    else {
        calcular($(this).html());
    }
    novovalor = true;
    escrever();
}

function calcular(novooperador) {
    let primeirovalor = Number(principal.replace(',', '.'));
    if (secundario == '') {
        calculado = primeirovalor;
    }
    else {
        switch (operador) {
            case '+':
                calculado = Number(calculado + primeirovalor);
                break;
            case '-':
                calculado = Number(calculado - primeirovalor);
                break;
            case '*':
                calculado = Number(calculado * primeirovalor);
                break;
            case '/':
                calculado = Number(calculado / primeirovalor);
                break;
            case '':
                calculado = primeirovalor;
                break;
        };
    }
    principal = calculado.toString().replace('.', ',');
    secundario = "".concat(secundario, ' ', primeirovalor.toString().replace('.', ','), ' ', novooperador);
    operador = novooperador;
}
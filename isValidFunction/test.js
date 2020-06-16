// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/

function ValidaCpf(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
    })
}

ValidaCpf.prototype.valida = function(){
    if(typeof this.cpfLimpo === 'undefined'){
        return false
    }else if(this.cpfLimpo.length !== 11){
        return false
    }else if(this.isSequencia()){
        return false
    }

    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito1 = this.criaDigito(cpfParcial)
    const digito2 = this.criaDigito(cpfParcial + digito1)
    const cpfVerificado = cpfParcial + digito1 + digito2

    if(cpfVerificado === this.cpfLimpo){
        console.log('Cpf Valido')
    }else{
        console.log('Cpf Invalido')
    }
}

ValidaCpf.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1
    const total = cpfArray.reduce((ac, value) => {
        ac += (regressivo * Number(value))
        regressivo --
        return ac
    }, 0)
    const digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito)
}

ValidaCpf.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo
}

const cpf0 = new ValidaCpf('070.987.720-03');
const cpf5 = new ValidaCpf('705.484.450-52');
const cpfInvalido = new ValidaCpf('111.111.111-11')
console.log(cpf0.valida());
console.log(cpf5.valida());
console.log(cpfInvalido.valida())
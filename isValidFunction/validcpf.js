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

function ValidCpf(sendCpf){
    Object.defineProperties(this, 'cpfClear' , {
        enumrable: true,
        get: () => {
            return sendCpf.replace(/\D+/g, '')
        }
    })
}

/*
 *form verification
*/
ValidCpf.prototype.valid = () => {
    
    if(typeof this.cpfClear === 'undefined'){
        return false
    }else if(this.cpfClear.length !== 11){
        return false
    }else if(this.isSequence()){
        return false
    }
}

/* 
 * calculation create digit
 */ 
const cpfPartial = this.cpfClear.slice(0, -2)
const digit1 = this.createDigit(cpfPartial)
const digit2 = this.createDigit(cpfPartial + digit1)
const cpfCheck = cpfPartial + digit1 + digit2

if(cpfCheck === this.cpfClear){
    console.log('Cpf Valido')
}else {
    console.log('Cpf Invalido')
}

/*
 * create digit for verification
 */
ValidCpf.prototype.createDigit = (cpfPartial) => {
    const cpfArray = Array.from(cpfPartial)

    let regressivo = cpfArray.length + 1
    const total = cpfArray.reduce((ac, value) => {
        ac += (regressivo * Number(value))
        regressivo --
        return ac
    }, 0)
    const digit = 11 - (total % 11)
    return digit > 9 ? '0' : String(digit)
}

/* 
 * check if it is not a sequence
 */ 
ValidCpf.prototype.isSequence = () =>{
    const sequence = this.cpfClear[0].repeat(this.cpfClear.length)
    return sequence === this.cpfClear
}

const cpf1 = new ValidCpf('070.987.720-03')
const cpf2 = new ValidCpf('705.484.450-52')
const cpf3 = new ValidCpf('111.111.111-11')

console.log(cpf1.valid())
console.log(cpf2.valid())
console.log(cpf3.valid())



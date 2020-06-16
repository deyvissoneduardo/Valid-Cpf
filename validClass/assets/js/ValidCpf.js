class ValidCpf{

    constructor(sendCpf) {
        Object.defineProperty(this, 'cpfClear', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: sendCpf.replace(/\D+/g, '')
        })
    }

    isSequence() {
        return this.cpfClear.charAt(0).repeat(11) === this.cpfClear
    }


    generateNewCpf(){
      const cpfSemDigit = this.cpfClear.slice(0, -2);
      const digit1 = ValidaCPF.geraDigit(cpfSemDigit);
      const digit2 = ValidaCPF.geraDigit(cpfSemDigit + digit1);
      this.newCpf = cpfSemDigit + digit1 + digit2;
    }

    static generateDigit(cpfSemDigit) {
        let total = 0;
        let reverso = cpfSemDigit.length + 1;
    
        for(let stringNumerica of cpfSemDigit) {
          total += reverso * Number(stringNumerica);
          reverso--;
        }
    
        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
    }

    valid() {
        if(!this.cpfClear) return false;
        if(typeof this.cpfClear !== 'string') return false;
        if(this.cpfClear.length !== 11) return false;
        if(this.isSequence()) return false;
        this.generateNewCpf();
    
        return this.newCpf === this.cpfClear;
    }

}

   let validcpf = new ValidCpf('070.987.720-03');
    validcpf = new ValidCpf('999.999.999-99');
  
   if (validcpf.valid()) {
    console.log('CPF válido');
 } else {
    console.log('CPF inválido');
  }
 


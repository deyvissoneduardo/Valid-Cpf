class ValidForm {
    constructor() {
      this.form = document.querySelector('.form');
      this.event();
    }
  
    event() {
      this.form.addEventListener('submit', e => {
        this.handleSubmit(e);
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const fieldsValid = this.fildsIsValid();
      const passwords  = this.passIsValid();
  
      if(fieldsValid && passwords) {
        alert('Formulário enviado.');
        this.form.submit();
      }
    }
  
    passIsValid() {
      let valid = true;
  
      const pass = this.form.querySelector('.pass');
      const repetirpass = this.form.querySelector('.repetir-pass');
  
      if(pass.value !== repetirpass.value) {
        valid = false;
        this.createErro(pass, 'Campos senha e repetir pass precisar ser iguais.');
        this.createErro(repetirpass, 'Campos senha e repetir pass precisar ser iguais.');
      }
  
      if(pass.value.length < 6 || pass.value.length > 12) {
        valid = false;
        this.createErro(pass, 'pass precisa estar entre 6 e 12 caracteres.');
      }
  
      return valid;
    }
  
    fildsIsValid() {
      let valid = true;
  
      for(let errorText of this.form.querySelectorAll('.error-text')) {
        errorText.remove();
      }
  
      for(let field of this.form.querySelectorAll('.valid')) {
        const label = field.previousElementSibling.innerText;
  
        if(!field.value) {
          this.createErro(field, `Campo "${label}" não pode estar em branco.`);
          valid = false;
        }
  
        if(field.classList.contains('cpf')) {
          if(!this.validCPF(field)) valid = false;
        }
  
        if(field.classList.contains('user')) {
          if(!this.validUser(field)) valid = false;
        }
  
      }
  
      return valid;
    }
  
    validUser(field) {
      const user = field.value;
      let valid = true;
  
      if(user.length < 3 || user.length > 12) {
        this.createErro(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
        valid = false;
      }
  
      if(!user.match(/^[a-zA-Z0-9]+$/g)) {
        this.createErro(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
        valid = false;
      }
  
      return valid;
    }
  
    validCPF(field) {
      const cpf = new ValidCpf(field.value);
  
      if(!cpf.valid()) {
        this.createErro(field, 'CPF inválido.');
        return false;
      }
  
      return true;
    }
  
    createErro(field, msg) {
      const div = document.createElement('div');
      div.innerHTML = msg;
      div.classList.add('error-text');
      field.insertAdjacentElement('afterend', div);
    }
  }
  
  const valid = new ValidForm();
  
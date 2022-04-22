class FormValidator {
  private _errors: string[] = [];

  private _addError = (error: string): void => {
    this._errors.push(error);
  };

  public getErrorsFormatted = () => {
    return this._errors.join(", ");
  };

  public hasErrors = (): boolean => {
    return this._errors.length > 0;
  };

  public validateEmail = (email: string): boolean => {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) {
      this._addError("Email not present.");
      return false;
    }

    if (email.length > 254) {
      this._addError("Email max length exceded: 254");
      return false;
    }

    var valid = emailRegex.test(email);
    if (!valid) {
      this._addError("Email format is not correct");
      return false;
    }
    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) return false;

    var domainParts = parts[1].split(".");
    if (
      domainParts.some((part) => {
        return part.length > 63;
      })
    ) {
      this._addError("Email domains are not correct");
      return false;
    }
    return true;
  };

  public validatePassword = (password: string) => {
    if (!password) {
      this._addError("Password is not present");
      return false;
    }

    if (password.length < 6) {
      this._addError(
        "Password is too short, has to be longer then 6 characters"
      );
      return false;
    }
    if (password.length > 254) {
      this._addError(
        "Password is too long, has to be shorter then 255 characters"
      );
      return false;
    }

    if (password.includes(" ")) {
      this._addError("Password cannot include spaces");
      return false;
    }

    return true;
  };
}

export default FormValidator;

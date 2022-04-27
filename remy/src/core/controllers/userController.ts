class UserControllerClass {
  private _authChangedEventHandlers: any[] = [];

  public addOnAuthChangedhandler = (handler: Function) => {
    console.log(handler);
    this._authChangedEventHandlers.push(handler);
  };

  public authChanged = () => {
    console.log(this._authChangedEventHandlers.length);
    this._authChangedEventHandlers.forEach((handler) => {
      handler();
    });
  };
}

const UserController = new UserControllerClass();

export default UserController;

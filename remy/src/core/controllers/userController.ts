class UserControllerClass {
  private _authChangedEventHandlers: any[] = [];

  public addOnAuthChangedhandler = (handler: Function) => {
    this._authChangedEventHandlers.push(handler);
  };

  public authChanged = () => {
    this._authChangedEventHandlers.forEach((handler) => {
      handler();
    });
  };
}

const UserController = new UserControllerClass();

export default UserController;

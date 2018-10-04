import * as React from 'react';

interface IButtonPROPS {
  contentSTR: string,
  className?: string,
  callbackFunc?: any
  disabled?: boolean
}

class Button extends React.Component<IButtonPROPS,{}> {
  constructor(props: IButtonPROPS){
    super(props);
  }

  public render() {
    return (
      <button onClick={this.props.callbackFunc} className={this.props.className} disabled={this.props.disabled}>{this.props.contentSTR}</button>
    );
  }
}

export default Button;
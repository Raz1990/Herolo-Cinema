import * as React from 'react';

interface IButtonProps {
  contentSTR: string,
  className?: string,
  callbackFunc?: any
  disabled?: boolean
}

class Button extends React.Component<IButtonProps,{}> {
  constructor(props: IButtonProps){
    super(props);
  }

  public render() {
    return (
      <button onClick={this.props.callbackFunc} 
              className={this.props.className} 
              disabled={this.props.disabled}><span>{this.props.contentSTR}</span></button>
    );
  }
}

export default Button;
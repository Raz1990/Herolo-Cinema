import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssModal.css';
import Button from './Button';
import Modal from './Modal';

interface IDeleteProps {
  cancelCallback: () => void,
  submitCallback: () => void,
}

class DeletePanel extends React.Component<IDeleteProps,any> {
  constructor(props: IDeleteProps){
    super(props);
  }
  
  public render(){
    return (  
      <Modal>
        <section>
          <section className='header'>
            <span>
              <label>Are you sure you want to delete this movie?</label>
            </span>
          </section>
          <section className='buttonsWrapper'>
            <Button contentSTR='Delete' 
                    className='btn accept-delete' 
                    callbackFunc={this.delete}/>
            <Button contentSTR='Cancel'
                    className='btn' 
                    callbackFunc={this.props.cancelCallback}/>
          </section>
        </section>
    </Modal>
    )
  }

  private delete = () => {
    this.props.submitCallback();
  }
}

export default DeletePanel;
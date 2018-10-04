import * as React from 'react';
import '../CSS/cssButton.css';
import '../CSS/cssModal.css';
import Modal from './Modal';

interface IDeleteProps {
  cancelCallback: () => void,
  submitCallback: () => void,
}

class DeletingPanel extends React.Component<IDeleteProps,any> {
  private modalArea: any;

  constructor(props: IDeleteProps){
    super(props);

    this.modalArea = React.createRef();
  }
  
  public render(){
    return (  
      <Modal>
        <section ref={this.modalArea}>
          <section className='header'>
            <span>
              <label>Are you sure you want to delete this movie?</label>
            </span>
          </section>
          <section className='buttonsWrapper'>
            <button className='btn accept' onClick={this.delete}>Delete</button>
            <button className='btn cancel' onClick={this.props.cancelCallback}>Cancel</button>
          </section>
        </section>
    </Modal>
    )
  }

  private delete = () => {
    this.props.submitCallback();
  }
}

export default DeletingPanel;
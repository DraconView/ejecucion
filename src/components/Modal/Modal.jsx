import { useState, useEffect } from 'react';
//import styles from './style.module.scss';
import { BsCloudCheck } from "react-icons/bs";
import { VscError as error } from "react-icons/vsc";
import { VscError as warning } from "react-icons/vsc";
import './CssModal.css';

const Modal = ({ visibility, children, type, title, message, }) => {

  let iconType;
  let backgroundBigIcon;
  let backgroundMediumIcon;
  let backgroundButtonConfirm;

  switch (type) {
    case 'success':
      iconType = BsCloudCheck;
      backgroundBigIcon = '#ECFDF3';
      backgroundMediumIcon = '#D1FADF';
      backgroundButtonConfirm = '#7F56D9';
      break;
    case 'error':
      iconType = error;
      backgroundBigIcon = '#FFFAEB';
      backgroundMediumIcon = '#FEF0C7';
      backgroundButtonConfirm = '#7F56D9';
      break;
    case 'warning':
      iconType = warning;
      backgroundBigIcon = '#FEE4E2';
      backgroundMediumIcon = '#FEF3F2';
      backgroundButtonConfirm = '#D92D20';
      break;
    default:
      iconType = BsCloudCheck;
      backgroundBigIcon = '#ECFDF3';
      backgroundMediumIcon = '#D1FADF';
      backgroundButtonConfirm = '#7F56D9';
  }

  const [isOpen, setIsOpen] = useState(visibility);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div>
        {isOpen && (
          <div className="modal">
            <div className="contenido-modal">
              <div className="circle-big-icon-modal" style={{backgroundColor: backgroundBigIcon}}>
                <div className="circle-medium-icon-modal" style={{backgroundColor: backgroundMediumIcon}}>
                  <img src={iconType} alt="Success" />
                </div>
              </div>
              <div >
                <span className="titulo-modal" >{title}</span>
              </div>
              <div >
                <p className="modal-body">{message}</p>
              </div>
              <div className="alineacion-button-modal">
                <button className="button-cancel-modal" onClick={toggleModal}>
                    Cancel
                </button>
                <button className="button-confirm-modal" style={{backgroundColor: backgroundButtonConfirm, border: `1px solid ${backgroundButtonConfirm}` }}>
                    Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;

/* USAR COMPONENTE CON UNA TERNARIA
const Form = () => {
  const submit: SubmitHandler<FormValues> = (data) => {
    setVisibility(true);
  };
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      {visibility === true ? (
        <Modal
          type="success"
          title="Blog post published"
          message="This blog post has been published. Team members will be able to edit this post and republish changes."
          visibility={true}
        />
      ) : (
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Ejemplo"
            register={register('example')}
            error={errors.example?.message}
          />
          <Button type="submit" theme="success">
            Probar
          </Button>
        </form>
      )}
    </>
  );
};
export default Form;
*/
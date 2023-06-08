import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {
  Button,
  Modal,
  Col,
} from "reactstrap";

function SimpleDialog(props) {

    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
      };
    

  return (
    <>
        <Col md="4">
          <Modal
            isOpen={open}
            className="modal-danger"
            contentClassName="bg-gradient-danger"
            onClick={() => handleClose}
          >
            <div className=" modal-header">
              <h6 className=" modal-title" id="modal-title-notification">
                Your attention is required
              </h6>
              <button
                aria-label="Close"
                className=" close"
                onClick={() => handleClose}
                type="button"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className=" modal-body">
              <div className=" py-3 text-center">
                <i className=" ni ni-bell-55 ni-3x"></i>
                <h4 className=" heading mt-4">You should read this!</h4>
                <p>
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia.
                </p>
              </div>
            </div>
            <div className=" modal-footer">
              <Button className=" btn-white" color="default" type="button">
                Ok, Got it
              </Button>
              <Button
                className=" text-white ml-auto"
                color="link"
                onClick={handleClose}
                type="button"
              >
                Close
              </Button>
            </div>
          </Modal>
        </Col>
        
    </>
  );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default SimpleDialog;
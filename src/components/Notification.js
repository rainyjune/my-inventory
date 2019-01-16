import React from 'react';
import { connect } from 'react-redux';
import { clearAppError } from '../actions';

const mapStateToProps = state => {
  return {
    appError: state.appError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHide: () => {
      dispatch(clearAppError());
    }
  };
}

let Notification = ({appError, onHide}) => {
  const tipsClassNames = ['tips'];
  if (appError) {
    tipsClassNames.push('show');
  }
  return (
    <div className={tipsClassNames.join(' ')} onAnimationEnd={onHide}>
      {appError}
    </div>
  );
};

Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default Notification;
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';



const RequestResponseDisplay = ({responseArray}) =>{
  const { t } = useTranslation('translations');
  return (
  <div>
    {responseArray && responseArray.map((dataItem) => (
      <>
        <p>
          <b> {t('ariaLabel.commandName')}:</b> {dataItem.request}
        </p>
        <p>
          <b>{t('ariaLabel.status')}:</b> {dataItem.status}
        </p>
        <p>
          <b>{t('ariaLabel.requestSentAt')}:</b> {dataItem.request_sent_at}
        </p>
        <p>
          <b>{t('ariaLabel.details')}:</b> {dataItem.status === 'OK' ? dataItem.response.result : dataItem.error.detail}
        </p>
        <hr />
      </>
    ))}
  </div>
);

} 

const EBRequestResponse = ({ ebData }) => {
 
  const { t } = useTranslation('translations');
  const [openModalEB, setOpenModalEB] = useState(false);

  const handleCloseRequestResponse = () => {
    setOpenModalEB(false);
  };

  const handleOpenEB = () => {
    setOpenModalEB(true);
  };



  return (
    <>
      {' '}
      <span
        id="shiftId"
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => handleOpenEB()}
        onKeyDown={() => handleOpenEB()}
      >
        {ebData && ebData.eb_id}
      </span>
      <Dialog
        aria-label={t('ariaLabel.dialog')}
        data-testid="dialogStatus"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '1000px' // Set your width here
            }
          }
        }}
        open={openModalEB}
        onClose={handleCloseRequestResponse}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>EB Request Response</DialogTitle>
        <DialogContent dividers>
          <RequestResponseDisplay responseArray={ebData.request_responses} />
        </DialogContent>
        <DialogActions>
          <Button
            color={ButtonColorTypes.Inherit}
            variant={ButtonVariantTypes.Contained}
            testId="statusClose"
            label={t('label.close')}
            onClick={handleCloseRequestResponse}
            toolTip={t('label.close')}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};



export default EBRequestResponse;

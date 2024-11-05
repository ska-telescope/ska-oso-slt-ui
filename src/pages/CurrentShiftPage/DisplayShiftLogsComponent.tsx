/* eslint-disable no-console */

import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Tooltip,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Button,
  ButtonColorTypes,
  ButtonSizeTypes,
  ButtonVariantTypes,
  FileUpload,
  InfoCard,
  InfoCardColorTypes,
  TextEntry
} from '@ska-telescope/ska-gui-components';
import AddIcon from '@mui/icons-material/Add';
import { EBRequestResponseStatus, toUTCDateTimeFormat } from '../../utils/constants';
import apiService from '../../services/apis';
import ImageDisplayComponent from '../../components/ImageDisplayComponent';

const RequestResponseDisplay = ({ responseArray }) => {
  const { t } = useTranslation('translations');
  const [openPannel] = useState(false);
  let id = 1;
  if (responseArray && responseArray.length > 0) {
    responseArray.map((row) => {
      row.id = id++;
      return row;
    });
  }
  return (
    <div>
      <span style={{ textDecoration: 'underline', fontWeight: 900, fontSize: '16px' }}>
        {t('label.ebObservations')}
      </span>
      {responseArray &&
        responseArray.map((dataItem) => (
          <div key={dataItem.id}>
            <Accordion defaultExpanded={openPannel}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <span>{dataItem.request ? dataItem.request : ''} </span>

                <Chip
                  size="small"
                  label={dataItem.status}
                  style={{ marginLeft: '10px' }}
                  color={dataItem.status === EBRequestResponseStatus.OK ? 'success' : 'error'}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container justifyContent="start">
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography>
                      {t('label.requestSentAt')}{' '}
                      <b>{toUTCDateTimeFormat(dataItem.request_sent_at)}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {dataItem.response_received_at && (
                      <Typography>
                        {t('label.responseReceivedAt')}{' '}
                        <b>{toUTCDateTimeFormat(dataItem.response_received_at)}</b>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container justifyContent="start" style={{ paddingTop: '10px' }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography style={{ textDecoration: 'underline', fontSize: '15px' }}>
                      {' '}
                      <b>{t('label.details')}</b>
                    </Typography>
                    <pre>
                      {dataItem.status === EBRequestResponseStatus.OK
                        ? dataItem.response.result
                        : dataItem.error.detail}
                    </pre>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </div>
  );
};

const DisplayShiftLogsComponent = ({ shiftData, updateCommentsEvent, isCurrentShift }) => {
  const { t } = useTranslation('translations');
  const [commentValue, setComment] = useState(null);
  const theme = useTheme();
  const [updateCommentValue, setUpdateComment] = useState(null);
  const logDataDetails = shiftData.shift_logs;
  const [openModal, setOpenModal] = useState(false);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [displayMessageElement, setDisplayMessageElement] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [logCommentsIndex, setLogCommentsIndex] = useState(0);
  const [logCommentID, setLogCommentID] = useState('');

  let id = 1;
  if (logDataDetails && logDataDetails.length > 0) {
    logDataDetails.map((row) => {
      row.id = id++;
      if (!row.newLogComment) {
        row.newLogComment = '';
      }
      return row;
    });
  }
  const postLogImage = async (file) => {
    const path = `shift/shifts/upload_image/`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        accept: 'application/json',
        'content-type': 'multipart/form-data'
      }
    };
    await apiService.postImage(path, formData, config);
    setMessageType('addLogImage');
    setMessage('msg.imageUpload');
    setDisplayMessageElement(true);
    updateCommentsEvent();
  };

  const addLogComments = async (index) => {
    if (commentValue === '') return;

    const comment = {
      comments: `${commentValue}`
    };

    const path = `shifts/update/`;
    setLogCommentsIndex(index);
    const response = await apiService.putShiftData(path, comment);
    if (response.status === 200) {
      updateCommentsEvent();
      setLogCommentID(response);
      console.log(logCommentID)
      setDisplayMessageElement(true);
      setMessageType('addLogComments');
      setMessage('msg.commentSubmit');
      setTimeout(() => {
        setDisplayMessageElement(false);
      }, 3000);
    }
  };
  const updateLogComments = async (logIndex) => {
    if (commentValue === '') return;

    const comment = {
      comments: `${commentValue}`
    };
    const path = `shifts/update/`;
    setLogCommentsIndex(logIndex);
    const response = await apiService.putShiftData(path, comment);
    if (response.status === 200) {
      updateCommentsEvent();
      setLogCommentID(response);
      setDisplayMessageElement(true);
      setMessageType('updateLogComments');
      setMessage('msg.commentSubmit');
      // shiftData["shift_logs"][logIndex]["log_comment"][commentIndex]["isEdit"]=false;
      setTimeout(() => {
        setDisplayMessageElement(false);
      }, 3000);
    }
  };

  const handleInputChange = (index, event) => {
    logDataDetails[index].newLogComment = event; // Update the specific input value
    setComment(event); // Set the new state
  };
  const handleUpdateInputChange = (logIndex, logData, commentIndex, commentItem) => {
    logData[logIndex].log_comment[commentIndex].logcomments = commentItem;
    setUpdateComment(commentItem); // Set the new state
    console.log(updateCommentValue)
  };

  const onEditComment = (logIndex, commentIndex) => {
    shiftData.shift_logs[logIndex].log_comment[commentIndex].isEdit = true;
    setComment(shiftData.shift_logs[logIndex].log_comment[commentIndex].logcomments);
    // setLogComment(shiftData["shift_logs"][logIndex]["log_comment"][commentIndex])
  };

  const displayLogComment = (logIndex, commentIndex, logData, commentItem) => (
    <div>
      <span style={{ fontWeight: 700, fontSize: '14px' }}> {t('label.comments')}: </span>
      <span>{commentItem.logcomments}</span>
      {isCurrentShift && (
        <Tooltip title="Edit the log comment" placement="bottom-end">
          <DriveFileRenameOutlineIcon
            color="secondary"
            aria-label={t('ariaLabel.edit')}
            data-testid="manageEntityStatus"
            style={{
              cursor: 'pointer',
              position: 'relative',
              top: '7px'
            }}
            onClick={() => onEditComment(logIndex, commentIndex)}
          />
        </Tooltip>
      )}
    </div>
  );

  const updateLogComment = (logIndex, commentIndex, logData) => (
    <Grid container justifyContent="start">
      <Grid item xs={12} sm={12} md={9}>
        <TextEntry
          rows={1}
          setValue={(event) => handleUpdateInputChange(logIndex, logData, commentIndex, event)}
          label={t('label.logCommentLabel')}
          value={logData[logIndex].log_comment[commentIndex].logcomments}
          testId={`logComment${commentIndex}`}
        />
      </Grid>
      <Grid marginTop={4} marginLeft={1} item xs={12} sm={12} md={2}>
        <Button
          icon={<AddIcon />}
          ariaDescription="Button for submitting comment"
          label="Update"
          testId="commentButton"
          onClick={() => updateLogComments(logIndex, commentIndex)}
          size={ButtonSizeTypes.Small}
          variant={ButtonVariantTypes.Contained}
          color={ButtonColorTypes.Secondary}
        />
      </Grid>
    </Grid>
  );
  const fetchImage = async () => {
    const path = `shifts/download_image/`;
    const result = await apiService.getImage(path);
    setImages(result && result.data && result.data[0]);
  };
  const handleOpenImage = () => {
    setOpenModal(true);
    fetchImage();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const renderMessageResponse = () => (
    <InfoCard
      minHeight="20px"
      fontSize={18}
      color={InfoCardColorTypes.Success}
      message={t(message)}
      testId="successStatusMsg"
    />
  );
  return (
    <div>
      {logDataDetails &&
        logDataDetails.length > 0 &&
        logDataDetails.map((data, logIndex) => (
          <div key={data.id}>
            <Paper style={{ padding: '10px', paddingTop: 0, paddingBottom: 0 }}>
              <Grid container justifyContent="start">
                <Grid item xs={12} sm={12} md={6.5}>
                  <Grid container justifyContent="start" style={{ paddingTop: '10px' }}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Chip size="small" label={`Source:${data.source}`} color="default" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <span>
                        {t('label.logTime')} <b>{toUTCDateTimeFormat(data.log_time)}</b>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} />
                    <Grid item xs={12} sm={12} md={2}>
                      <Chip
                        size="small"
                        label={`${data.info.sbi_status.toUpperCase()}`}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <p>
                        {t('label.ebID')} <b>{data.info.eb_id}</b>
                      </p>
                      <p>
                        {t('label.sbiID')} <b>{data.info.sbi_ref}</b> {t('label.isStatus')}{' '}
                        <b>{data.info.sbi_status}</b>
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="start">
                    <Grid item xs={12} sm={12} md={12}>
                      <RequestResponseDisplay responseArray={data.info.request_responses} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)', paddingLeft: '10px' }}
                  item
                  xs={12}
                  sm={12}
                  md={5.5}
                >
                  {isCurrentShift && (
                    <>
                      <Grid container justifyContent="start" style={{ position: 'relative' }}>
                        <Grid item xs={12} sm={12} md={4}>
                          <p
                            style={{
                              textDecoration: 'underline',
                              fontWeight: 900,
                              fontSize: '18px'
                            }}
                          >
                            {t('label.addLogComments')}
                          </p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                          <div style={{ position: 'absolute', zIndex: 2, top: '5px' }}>
                            {displayMessageElement &&
                            messageType === 'addLogComments' &&
                            logIndex === logCommentsIndex
                              ? renderMessageResponse()
                              : ''}
                            {displayMessageElement &&
                            messageType === 'addLogImage' &&
                            logIndex === logCommentsIndex
                              ? renderMessageResponse()
                              : ''}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="start">
                        <Grid item xs={12} sm={12} md={10}>
                          <TextEntry
                            rows={1}
                            setValue={(event) => handleInputChange(logIndex, event)}
                            label={t('label.logCommentLabel')}
                            value={logDataDetails[logIndex].newLogComment}
                            testId={`logComment${logIndex}`}
                          />
                        </Grid>
                        <Grid item marginTop={4} marginLeft={1} xs={12} sm={12} md={1}>
                          <Button
                            icon={<AddIcon />}
                            ariaDescription="Button for submitting comment"
                            label={t('label.add')}
                            disabled={
                              !(
                                logDataDetails[logIndex].newLogComment &&
                                logDataDetails[logIndex].newLogComment !== ''
                              )
                            }
                            testId="commentButton"
                            onClick={() => addLogComments(logIndex)}
                            size={ButtonSizeTypes.Small}
                            variant={ButtonVariantTypes.Contained}
                            color={ButtonColorTypes.Secondary}
                          />
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="center">
                        <Grid item xs={12} sm={12} md={12}>
                          <div>
                            <p
                              style={{
                                textDecoration: 'underline',
                                fontWeight: 900,
                                fontSize: '18px'
                              }}
                            >
                              {t('label.addImages')}
                            </p>
                          </div>
                          <div style={{ float: 'left' }}>
                            <FileUpload
                              chooseColor={ButtonColorTypes.Secondary}
                              chooseVariant={ButtonVariantTypes.Contained}
                              clearLabel="Remove"
                              clearVariant={ButtonVariantTypes.Outlined}
                              buttonSize={ButtonSizeTypes.Small}
                              testId={`logImage${logIndex}`}
                              uploadFunction={postLogImage}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <Divider style={{ marginTop: '15px' }} />
                    </>
                  )}

                  <Box
                    data-testid="availableData"
                    sx={{
                      marginTop: 2,
                      maxHeight: '500px',
                      paddingRight: '10px',
                      overflowY: 'scroll'
                    }}
                  >
                    <Grid container justifyContent="start" style={{ position: 'relative' }}>
                      <Grid item xs={12} sm={12} md={5}>
                        <p
                          style={{
                            textDecoration: 'underline',
                            fontWeight: 900,
                            fontSize: '18px'
                          }}
                        >
                          <b> {t('label.logCommentHistory')}</b>
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={12} md={7}>
                        <div style={{ position: 'absolute', zIndex: 2 }}>
                          {displayMessageElement &&
                          messageType === 'updateLogComments' &&
                          logIndex === logCommentsIndex
                            ? renderMessageResponse()
                            : ''}
                        </div>
                      </Grid>
                    </Grid>

                    <Divider />

                    {data &&
                      data.log_comment &&
                      data.log_comment.length > 0 &&
                      data.log_comment.map((commentItem, commentIndex) => (
                        <div key={commentItem.id}>
                          <Grid container justifyContent="start">
                            <Grid item xs={12} sm={12} md={6}>
                              <p>
                                <span style={{ fontWeight: 700, fontSize: '14px' }}>
                                  {t('label.logTime')}: {toUTCDateTimeFormat(data.log_time)}
                                </span>
                              </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <p
                                style={{
                                  color: theme.palette.secondary.main,
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                                aria-hidden="true"
                                data-testid="viewImages"
                                onClick={handleOpenImage}
                              >
                                {t('label.viewImages')}
                              </p>
                            </Grid>
                          </Grid>

                          <div>
                            {!commentItem.isEdit &&
                              displayLogComment(
                                logIndex,
                                commentIndex,
                                logDataDetails,
                                commentItem
                              )}
                            {commentItem.isEdit &&
                              isCurrentShift &&
                              updateLogComment(logIndex, commentIndex, logDataDetails)}
                          </div>
                          <Divider />
                        </div>
                      ))}
                    {data && !data.log_comment && <p>{t('label.nologComments')}</p>}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Divider />
          </div>
        ))}
      <Dialog
        aria-label={t('ariaLabel.dialog')}
        data-testid="dialogStatus"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '1000px'
            }
          }
        }}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>{t('label.viewImages')}</DialogTitle>
        <DialogContent dividers>
          {images && images.length > 0 && <ImageDisplayComponent images={images} />}
        </DialogContent>
        <DialogActions>
          <Button
            color={ButtonColorTypes.Inherit}
            variant={ButtonVariantTypes.Contained}
            testId="statusClose"
            label={t('label.close')}
            onClick={handleClose}
            toolTip={t('label.close')}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DisplayShiftLogsComponent;

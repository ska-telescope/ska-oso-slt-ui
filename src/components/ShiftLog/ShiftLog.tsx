import { useTranslation } from 'react-i18next';
import { Grid, Paper, TextField } from '@mui/material';
import {
  Button,
  ButtonColorTypes,
  ButtonVariantTypes,
  FileUpload
} from '@ska-telescope/ska-gui-components';

const ShiftLog = () => {
  const { t } = useTranslation('translations');

  return (
    <Paper sx={{ pb: 2 }}>
      <Grid container sx={{ margin: 2 }} justifyContent="left">
        <Grid item xs={12} sm={12} md={2}>
          <Button
            disabled
            color={ButtonColorTypes.Secondary}
            variant={ButtonVariantTypes.Contained}
            testId="dateSearch"
            label="Shift started"
            toolTip={t('toolTip.button.dateSearch')}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Button
            disabled={false}
            color={ButtonColorTypes.Secondary}
            variant={ButtonVariantTypes.Contained}
            testId="dateSearch"
            label="End shift"
            toolTip={t('toolTip.button.dateSearch')}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} />
        <Grid item xs={12} sm={12} md={2}>
          <Button
            color={ButtonColorTypes.Inherit}
            variant={ButtonVariantTypes.Contained}
            testId="dateSearch"
            label="previous shifts"
            toolTip={t('toolTip.button.dateSearch')}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ margin: 2 }} justifyContent="left">
        <Grid item xs={12} sm={12} md={5}>
          <TextField
            sx={{ width: 500 }}
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={1}>
          <Button
            disabled={false}
            color={ButtonColorTypes.Secondary}
            variant={ButtonVariantTypes.Contained}
            testId="dateSearch"
            label="Save"
            toolTip={t('toolTip.button.dateSearch')}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <FileUpload direction="row" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ShiftLog;

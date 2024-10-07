import { Autocomplete, Grid, TextField } from '@mui/material';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { operatorName } from '../../../utils/constants';

interface EntryFieldProps {
  setFilterCirteria;
}

const SearchByOperator = ({ setFilterCirteria }: EntryFieldProps) => {
  const { t } = useTranslation('translations');
  const [operatorValue, setValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState('');

  const disableSearch = () => {
    if (operatorValue && operatorValue.length > 0) {
      return false;
    }
    return true;
  };

  const emmitOperator = () => {
    const emmitData = {
      shift_operator: operatorValue
    };
    setFilterCirteria(emmitData);
  };
  return (
    <Grid container spacing={2} justifyContent="left" sx={{ marginTop: '-15px' }}>
      <Grid item xs={12} sm={12} md={3}>
        <Autocomplete
          value={operatorValue}
          onChange={(event, newValue: string) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          data-testid="operatorName"
          options={operatorName}
          renderInput={(params) => (
            <TextField {...params} label={t('label.operatorName')} variant="standard" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={1} />
      <Grid item xs={12} sm={6} md={3} sx={{ marginTop: '15px' }}>
        <Button
          icon={<SearchIcon />}
          ariaDescription={t('ariaLabel.searchButtonDescription')}
          disabled={disableSearch()}
          color={ButtonColorTypes.Secondary}
          variant={ButtonVariantTypes.Contained}
          testId="logHistorySearch"
          label={t('label.searchById')}
          onClick={emmitOperator}
          toolTip={t('toolTip.button.idSearch')}
        />
      </Grid>
    </Grid>
  );
};

export default SearchByOperator;

import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../../services/theme/theme';
import SLTHistoryTableList from './SLTHistoryTable';
import SLTHistoryMockList from '../../../mockData/SLTHistoryMock';
import SltHistoryDataModel from '../../Models/SLTHistory';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<SLTHistoryTableList />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders SLTHistoryTableList`, () => {
      const mockData: SltHistoryDataModel[] = SLTHistoryMockList;
      mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <SLTHistoryTableList data={mockData} updateList={undefined} />
        </ThemeProvider>
      );
    });
  }
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NutrientValueList from './NutrientValueList';
import { DailyValue1, Nutrient1, Nutrient2, Nutrient3, getTestDailyValueContextData,
  getTestNutrientContextData} from '../../test_data';
import NewNutrient from '../../types/new/NewNutrient';

import { act } from 'react-dom/test-utils';

import NutrientDataContext from '../../store/NutrientDataContext';
import DailyValueDataContext from '../../store/DailyValueDataContext';
import Nutrient from '../../types/Nutrient';
import Id from '../../types/Id';
import { DataContextData } from '../../store/DataContext';
import DailyValue from '../../types/DailyValue';
import NewDailyValue from '../../types/new/NewDailyValue';

import userEvent from '@testing-library/user-event';

describe('NutrientValueList', () => {
  test('add', async () => {
    const mockListUpdate = jest.fn();
    render(
      <DailyValueDataContext.Provider value={getTestDailyValueContextData()}>
        <NutrientDataContext.Provider value={getTestNutrientContextData()}>
          <NutrientValueList
            data={[]}
            onListUpdate={mockListUpdate}
          />
        </NutrientDataContext.Provider>
      </DailyValueDataContext.Provider>
    );
    expect(screen.getByText(/no data to display./i)).toBeInTheDocument();
    expect(mockListUpdate).toBeCalledTimes(1);
    const select = screen.getByRole<HTMLSelectElement>('combobox');
    const valueInput = screen.getByRole<HTMLInputElement>('spinbutton');
    // TODO: guaranteed to be returned in the same order as they are in the DOM?
    const radioButtons = screen.getAllByRole('radio');
    const submitButton = screen.getByRole('button');
    expect(select).toHaveValue('1');
    expect(valueInput).toHaveTextContent('');
    expect(radioButtons[0]).toBeChecked();
    await waitFor(() => userEvent.type(valueInput, '5'));
    await waitFor(() => userEvent.click(submitButton));
    expect(screen.getByText(
      `${Nutrient1.name.name}: ${5}${Nutrient1.name.abbreviation}`))
      .toBeInTheDocument();
    expect(mockListUpdate).toBeCalledTimes(2);
    await waitFor(
      () => userEvent.selectOptions(select, ['2']));
    await waitFor(() => userEvent.clear(valueInput));
    await waitFor(() => userEvent.type(valueInput, '10'));
    await waitFor(() => userEvent.click(submitButton));
    expect(screen.getByText(
      `${Nutrient1.name.name}: ${5}${Nutrient1.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(screen.getByText(
      `${Nutrient2.name.name}: ${10}${Nutrient2.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(mockListUpdate).toBeCalledTimes(3);
    await waitFor(
      () => userEvent.selectOptions(select, ['1']));
    await waitFor(() => userEvent.clear(valueInput));
    await waitFor(() => userEvent.type(valueInput, '20'));
    await waitFor(() => userEvent.click(submitButton));
    expect(screen.getByText(
      `${Nutrient1.name.name}: ${25}${Nutrient1.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(screen.getByText(
      `${Nutrient2.name.name}: ${10}${Nutrient2.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(mockListUpdate).toBeCalledTimes(4);
    await waitFor(
      () => userEvent.selectOptions(select, ['3']));
    await waitFor(() => userEvent.clear(valueInput));
    await waitFor(() => userEvent.type(valueInput, '50'));
    await waitFor(() => userEvent.click(radioButtons[1]));
    await waitFor(() => userEvent.click(submitButton));
    expect(screen.getByText(
      `${Nutrient1.name.name}: ${25}${Nutrient1.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(screen.getByText(
      `${Nutrient2.name.name}: ${10}${Nutrient2.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(screen.getByText(
      `${Nutrient3.name.name}: ${150}${Nutrient3.unit.name.abbreviation}`))
      .toBeInTheDocument();
    expect(mockListUpdate).toBeCalledTimes(5);
  });

  test('remove', async () => {
    const mockListUpdate = jest.fn();
    act(() => {
      render(
        <DailyValueDataContext.Provider value={getTestDailyValueContextData()}>
          <NutrientDataContext.Provider value={getTestNutrientContextData()}>
            <NutrientValueList
              data={[]}
              onListUpdate={mockListUpdate}
            />
          </NutrientDataContext.Provider>
        </DailyValueDataContext.Provider>
      );
    });
    expect(mockListUpdate).toBeCalledTimes(1);
    const select = screen.getByRole<HTMLSelectElement>('combobox');
    const valueInput = screen.getByRole<HTMLInputElement>('spinbutton');
    const submitButton = screen.getByRole('button');
    await waitFor(() => userEvent.type(valueInput, '5'));
    await waitFor(() => userEvent.click(submitButton));
    expect(mockListUpdate).toBeCalledTimes(2);
    await waitFor(
      () => userEvent.selectOptions(select, ['2']));
    await waitFor(() => userEvent.clear(valueInput));
    await waitFor(() => userEvent.type(valueInput, '10'));
    await waitFor(() => userEvent.click(submitButton));
    expect(mockListUpdate).toBeCalledTimes(3);
    let buttons = screen.getAllByRole<HTMLButtonElement>('button');
    expect(buttons).toHaveLength(3);
    await waitFor(() => userEvent.click(buttons[0]));
    expect(mockListUpdate).toBeCalledTimes(4);
    buttons = screen.getAllByRole<HTMLButtonElement>('button');
    expect(buttons).toHaveLength(2);
    await waitFor(() => userEvent.click(buttons[0]));
    expect(mockListUpdate).toBeCalledTimes(5);
    expect(screen.getAllByRole<HTMLButtonElement>(
      'button')).toHaveLength(1);
  });
});

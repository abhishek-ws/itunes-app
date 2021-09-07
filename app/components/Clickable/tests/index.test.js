/**
 *
 * Tests for Clickable
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import Clickable from '../index';

describe('<Clickable /> component tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Clickable />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Clickable component', () => {
    const { getAllByTestId } = renderWithIntl(<Clickable />);
    expect(getAllByTestId('clickable').length).toBe(1);
  });

  it('should contain render the text according to the textId', () => {
    const { getAllByText } = renderWithIntl(<Clickable textId="list_songs" />);
    expect(getAllByText(/List of songs will appear below/).length).toBe(1);
  });

  it('should call the prop onClick when the clickable component is clicked', () => {
    const clickSpy = jest.fn();
    const { getAllByText, queryByText } = renderWithIntl(<Clickable onClick={clickSpy} textId="list_songs" />);
    expect(getAllByText(/List of songs will appear below/).length).toBe(1);
    fireEvent.click(queryByText(/List of songs will appear below/));
    expect(clickSpy).toBeCalled();
  });
});

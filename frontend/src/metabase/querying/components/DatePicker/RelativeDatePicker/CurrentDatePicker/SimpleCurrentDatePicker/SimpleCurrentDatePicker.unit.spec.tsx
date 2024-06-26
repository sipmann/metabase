import _userEvent from "@testing-library/user-event";

import { renderWithProviders, screen } from "__support__/ui";

import type { RelativeDatePickerValue } from "../../../types";

import { SimpleCurrentDatePicker } from "./SimpleCurrentDatePicker";

const DEFAULT_VALUE: RelativeDatePickerValue = {
  type: "relative",
  value: "current",
  unit: "day",
};

interface SetupOpts {
  value?: RelativeDatePickerValue;
}

const userEvent = _userEvent.setup({
  advanceTimers: jest.advanceTimersByTime,
});

function setup({ value = DEFAULT_VALUE }: SetupOpts = {}) {
  const onChange = jest.fn();

  renderWithProviders(
    <SimpleCurrentDatePicker value={value} onChange={onChange} />,
  );

  return { onChange };
}

describe("SimpleCurrentDatePicker", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 0, 1));
  });

  it("should be able to filter by a current interval", async () => {
    const { onChange } = setup();

    await userEvent.click(screen.getByDisplayValue("Day"));
    await userEvent.click(screen.getByText("Week"));

    expect(onChange).toHaveBeenCalledWith({
      type: "relative",
      value: "current",
      unit: "week",
    });
  });
});

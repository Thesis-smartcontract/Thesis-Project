export const TEST_INPUT_CHANGE = 'TEST_INPUT_CHANGE'

export const changeTestInputValue = (value) => {
  return {
    type: TEST_INPUT_CHANGE,
    payload: value
  }
}
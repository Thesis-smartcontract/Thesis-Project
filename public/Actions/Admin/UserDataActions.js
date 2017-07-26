export const INPUT_CHANGE = 'INPUT_CHANGE'

export const changeInputValue = (value) => {
  return {
    type: INPUT_CHANGE,
    payload: value
  }
}
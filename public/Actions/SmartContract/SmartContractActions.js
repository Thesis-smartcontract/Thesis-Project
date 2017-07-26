export const clickDocumentation = link => {
  console.log('You clicked the documenation link');
  return {
    type: "SMART_CONTRACT_CLICKED",
    payload: link
  }
};
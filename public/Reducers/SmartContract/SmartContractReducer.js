import { clickDocumentation } from '../../Actions/SmartContract/SmartContractActions';


export const SmartContract = (state = 0, action ) => {
    switch (action.type) {
      case SMART_CONTRACT_CLICKED:
        return state + 1;
      break;
  }
}

export default SmartContract;
import Select from 'react-select'
import BalancePage from './Balance/BalancePage';

// import { TransactionForm } from 'components/TransactionForm/TransactionForm';



export const Main = () => {



  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  
    
  return (
    <div>

      <BalancePage />
      <Select options={options}  />
     

    </div>
  );
};

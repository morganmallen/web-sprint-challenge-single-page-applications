import React, {useState} from "react";

const PizzaForm = (props) => {
  const [nameInput, setNameInput] = useState('');
  const [nameInputError, setNameInputError] = useState('');
  const {values, change, errors, submit} = props;

  // const handleValidation = () => {
  //   if (nameInput.length < 2) {
  //     setNameInputError('name must be at least 2 characters')
  //   }
  // }

  const onSubmit = evt => {
    evt.preventDefault()
    console.log('submitting')
    submit()
  }

  const onChange = evt => {
    const { name, value, checked, type } = evt.target
    const valueToUse = type === "checkbox" ? checked : value
    change(name, valueToUse)
  }
  return (
    <div id='pizza-form'>
      <h1>Pizza Form</h1>
      <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
      <label id='name-input'>Name
        <input
          type='text'
          name='name'
          onChange={onChange}
          value={values.name}
          />
      </label>
      <div style={{color: 'red'}}>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
        </div>
      

      <label id='size-dropdown'>Size
        <select
          name='size'
          onChange={onChange}
          value={values.size}
        >
          <option value=''>- Select a Size-</option>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='large'>Large</option>
        </select>
      </label>

      <div className="toppings">
      <label>Pepperoni
        <input
          type='checkbox'
          name='topping1'
          onChange={onChange}
          value={values.topping1}
        />
      </label>    
      <label>Sausage
        <input
          type='checkbox'
          name='topping2'
          onChange={onChange}
          value={values.topping2}
        />
        </label>
        <label>Ham
        <input
          type='checkbox'
          name='topping3'
          onChange={onChange}
          value={values.topping3}

        />
      </label>  
      <label>Pineapple
        <input
          type='checkbox'
          name='topping4'
          onChange={onChange}
          value={values.topping4}

        />
      </label>  
      </div>

      <label id='special-text'>Special Instructions
        <input
          type='text'
          name='special'
          onChange={onChange}
          value={values.special}
        />
      </label>
      <label id='order-button'>Add to Order
        <input
          type='submit'
          name='submit'
          onClick={onSubmit}
        />
      </label>

      </div>
      </div>
  );
};
export default PizzaForm;

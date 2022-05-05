import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import PizzaForm from './PizzaForm';
import Home from './Home';

import axios from 'axios';
import schema from './formSchema';
import * as yup from 'yup';

const initialFormErrors = {
  name: '',
  size: '',
  topping1: false,
  topping2: false,
  topping3: false,
  topping4: false,
  special: ''
}
const initialFormValues = {
  name: '',
  size: '',
  topping1: false,
  topping2: false,
  topping3: false,
  topping4: false,
  special: ''
}

const App = () => {
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState(initialFormValues)

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const postNewPizza = newPizza => {
    console.log('newPizza: ', newPizza);

    axios.post("https://reqres.in/api/orders", newPizza)
      .then(res => {
        // setFriends([ res.data, ...friends ]);
        console.log('res:', res.data)
        setFormValues(initialFormValues);
        return res.data.name
      }).catch(err => console.log(err))
  }

  const formSubmit = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      topping1: formValues.topping1,
      topping2: formValues.topping2,
      topping3: formValues.topping3,
      topping4: formValues.topping4,
      special: formValues.special.trim()
    }
    postNewPizza(newPizza);
  }

  return (
    <>
      <h1>Lambda Eats</h1>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Link id='order-pizza' to="/pizza">
          Pizza
        </Link>
        <Link  to="/">
          Home
        </Link>
        </div>


      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/pizza'>
        <PizzaForm 
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          errors={formErrors}
        />
      </Route>

    </>
  );
};
export default App;

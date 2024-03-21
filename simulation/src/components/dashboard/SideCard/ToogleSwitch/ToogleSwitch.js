import React from 'react';
import { Form } from 'react-bootstrap';

function ToogleSwitch({ label, checked, onChange }) {
  return (
    <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                label={checked ? 'Vehicle' : 'SwapStation'}
                checked={checked}
                onChange={onChange}
            />
        </Form>
  );
};

export default ToogleSwitch

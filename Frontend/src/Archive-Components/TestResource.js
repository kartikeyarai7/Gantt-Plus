import React, { useState } from 'react';
import StepProgressBar from 'react-step-progress';
import RangeSlider from 'react-bootstrap-range-slider';
import { Form } from 'react-bootstrap';
import 'react-step-progress/dist/index.css';

const TestResource = () => {
  const [m3Value, setM3Value] = useState(0);
  const [m5Value, setM5Value] = useState(0);
  const [m7Value, setM7Value] = useState(0);
  const [x9Value, setX9Value] = useState(0);

  const [pronoteValue, setPronoteValue] = useState(0);
  const [cSegmentValue, setCValue] = useState(0);

  const step1Content = (
    <div className='my-5'>
      <Form.Group>
        <Form.Label>M3 Experience</Form.Label>
        <RangeSlider value={m3Value} onChange={changeEvent => setM3Value(changeEvent.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>M5 Experience</Form.Label>
        <RangeSlider value={m5Value} onChange={changeEvent => setM5Value(changeEvent.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>M7 Experience</Form.Label>
        <RangeSlider value={m7Value} onChange={changeEvent => setM7Value(changeEvent.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>X9 Experience</Form.Label>
        <RangeSlider value={x9Value} onChange={changeEvent => setX9Value(changeEvent.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Pronote Experience</Form.Label>
        <RangeSlider value={pronoteValue} onChange={changeEvent => setPronoteValue(changeEvent.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>C Segment Experience</Form.Label>
        <RangeSlider value={cSegmentValue} onChange={changeEvent => setCValue(changeEvent.target.value)} />
      </Form.Group>
    </div>
  );
  const step2Content = <h2>Step 2 Content</h2>;
  const step3Content = <h2>Step 3 Content</h2>;
  function step2Validator() {
    // return a boolean
  }

  function step3Validator() {
    // return a boolean
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  // render the progress bar

  return (
    <>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: 'Installation',
            name: 'step 1',
            content: step1Content
          },
          {
            label: 'Preventive Maintenance',
            name: 'step 2',
            content: step2Content,
            validator: step2Validator
          },
          {
            label: 'Corrective Maintenance',
            name: 'step 3',
            content: step3Content,
            validator: step3Validator
          }
        ]}
      />
    </>
  );
};

export default TestResource;

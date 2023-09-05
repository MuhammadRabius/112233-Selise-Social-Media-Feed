import { Field, ErrorMessage } from "formik";

const SelectInput = ({ name, options, classes }) => {
  return (
    <>
      <Field name={name} as="select" className={"form-select " + classes}>
        {options.map((option,index) => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </Field>
      <ErrorMessage component="small" name={name} className="text-danger" />
    </>
  );
};

export default SelectInput;

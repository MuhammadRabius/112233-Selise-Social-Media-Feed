import {Field,  ErrorMessage } from "formik";
const TextInput = ({type,name,placeholder,classes}) => {
  return (
    <div>
        <Field
                type={type}
                className={"form-control " +classes }
                name={name}
                autoComplete="off"
                placeholder={placeholder}
              />
              <ErrorMessage
                component="small"
                name={name}
                className="text-danger"
              />
    </div>
  )
}

export default TextInput
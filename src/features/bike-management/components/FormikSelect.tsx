import { useField } from 'formik';
import { Select } from '@/components/custom/select';

const FormikSelect = ({ label, options, ...props } : any) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (value : any) => {
    helpers.setValue(value);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <Select
        options={options}
        value={field.value}
        onChange={handleChange}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikSelect;

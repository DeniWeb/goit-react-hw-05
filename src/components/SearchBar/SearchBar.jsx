import { ErrorMessage, Field, Form, Formik } from 'formik';
import s from './SearchBar.module.css';
import * as Yup from 'yup';

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    handleChangeQuery(values.query);
    resetForm();
  };

  const applySchema = Yup.object().shape({
    query: Yup.string()
      .min(2, 'Minimum 2 chars')
      .max(20, 'Max 20 chars')
      .trim()
      .required('Please, enter your request'),
  });

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={applySchema}
    >
      <Form className={s.form_container}>
        <div className={s.input_wrapper}>
          <Field
            name="query"
            type="text"
            placeholder="Search movies..."
            className={s.form_input}
          />
          <ErrorMessage name="query" className={s.error} component="div" />
        </div>
        <button type="submit" className={s.form_btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;

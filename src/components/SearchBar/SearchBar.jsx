import { Field, Form, Formik } from 'formik';
import s from './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    handleChangeQuery(values.query);
    resetForm();
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form className={s.form_container}>
        <Field
          name="query"
          placeholder="Search movies..."
          className={s.form_input}
        />
        <button type="submit" className={s.form_btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;

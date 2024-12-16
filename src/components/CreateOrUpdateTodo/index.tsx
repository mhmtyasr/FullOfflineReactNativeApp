import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal';
import {Input} from '@rneui/themed';
import {TodoDto} from '@/model/services/todo/type';
import {usePostTodo, usePutTodo} from '@/hooks/queries/todoQuery';

interface TodoFormProps {
  initialValues: TodoDto | null;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  refetch: () => void;
}

interface TodoFormValues {
  title: string;
  description: string;
}

const TodoFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const CreateOrUpdateTodo: React.FC<TodoFormProps> = ({
  initialValues,
  showAddModal,
  setShowAddModal,
  refetch,
}) => {
  const formikRef = useRef<FormikProps<TodoFormValues>>(null);

  const {mutate, isPending} = usePostTodo({
    onSuccess: () => {
      refetch();
      setShowAddModal(false);
    },
  });

  const {mutate: putMutate, isPending: putIsLoading} = usePutTodo({
    onSuccess: () => {
      refetch();
      setShowAddModal(false);
    },
  });

  const onHandleSubmit = (values: TodoFormValues) => {
    if (initialValues?.id) {
      putMutate({
        ...values,
        id: initialValues.id,
      });
    } else {
      mutate(values);
    }
  };


  return (
    <Modal
      visible={showAddModal}
      title={initialValues?.id ? 'Update Todo' : 'Create Todo'}
      height={350}
      onOk={() => {
        if (formikRef.current) {
          formikRef.current.handleSubmit();
        }
      }}
      isLoading={isPending || putIsLoading}
      onCancel={() => {
        formikRef.current?.resetForm();
        setShowAddModal(false);
      }}>
      <Formik
        enableReinitialize
        initialValues={{
          title: initialValues?.title || '',
          description: initialValues?.description || '',
        }}
        validateOnMount={false}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={TodoFormSchema}
        innerRef={formikRef}
        onSubmit={onHandleSubmit}>
        {({handleChange, handleBlur, values, errors, touched}) => {
          return (
            <View style={styles.container}>
              <Input
                style={styles.input}
                onChangeText={handleChange('title')}
                onBlur={() => handleBlur('title')}
                value={values.title}
                placeholder="Enter Title"
                label="Title"
                labelStyle={styles.label}
                errorMessage={touched.title && errors.title ? errors.title : ''}
                errorStyle={styles.error}
                disabled={!!initialValues?.id}
              />

              <Input
                style={styles.input}
                onChangeText={handleChange('description')}
                onBlur={() => handleBlur('description')}
                value={values.description}
                placeholder="Description"
                label="Enter Description"
                errorMessage={
                  touched.description && errors.description
                    ? errors.description
                    : ''
                }
                errorStyle={styles.error}
              />
            </View>
          );
        }}
      </Formik>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
});

export default CreateOrUpdateTodo;

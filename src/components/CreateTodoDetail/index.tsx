import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal';
import {Input} from '@rneui/themed';
import {TodoDetailDto} from '@/model/services/todoDetails.ts/type';
import {usePostTodoDetail} from '@/hooks/queries/todoDetailsQuery';
import {BaseRequestParams} from '@/model/services/_base';

interface TodoDetailFormProps {
  initialValues: TodoDetailDto | null;
  showAddModal: boolean;
  setShowAddModal: () => void;
  refetch: () => void;
  todo: BaseRequestParams;
}

interface TodoDetailFormValues {
  detail: string;
}

const TodoDetailFormSchema = Yup.object().shape({
  detail: Yup.string().required('Detail is required'),
});

const CreateOrUpdateTodoDetail: React.FC<TodoDetailFormProps> = ({
  showAddModal,
  setShowAddModal,
  refetch,
  todo,
}) => {
  const formikRef = useRef<FormikProps<TodoDetailFormValues>>(null);

  const {mutate: postTodoDetail} = usePostTodoDetail({
    onSuccess: () => {
      refetch();
      setShowAddModal();
    },
  });

  const onHandleSubmit = (values: TodoDetailFormValues) => {
    postTodoDetail({
      detail: values.detail,
      todo,
    });
  };

  return (
    <Modal
      visible={showAddModal}
      title={'Create TodoDetail'}
      height={350}
      onOk={() => {
        if (formikRef.current) {
          formikRef.current.handleSubmit();
        }
      }}
      isLoading={false}
      onCancel={() => {
        formikRef.current?.resetForm();
        setShowAddModal();
      }}>
      <Formik
        initialValues={{
          detail: '',
        }}
        validationSchema={TodoDetailFormSchema}
        innerRef={formikRef}
        onSubmit={onHandleSubmit}>
        {({handleBlur, values, errors, touched, setFieldValue}) => (
          <View style={styles.container}>
            <Input
              style={styles.input}
              onChangeText={e => setFieldValue('detail', e)}
              onBlur={handleBlur('detail')}
              value={values.detail}
              placeholder="Enter Detail"
              label="Detail"
              labelStyle={styles.label}
              errorMessage={
                touched.detail && errors.detail ? errors.detail : ''
              }
              errorStyle={styles.error}
            />
          </View>
        )}
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

export default CreateOrUpdateTodoDetail;

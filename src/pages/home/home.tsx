import { Modal } from '@daphaz/hrnet-modal';
import { Button, Container } from '@daphaz/hrnet-ui';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import s from './styles.module.scss';

import { DropdownControlled, InputControlled } from '@/components';

import employeeService from '@/services/employee';
import { departments, states } from '@/static';
import { CreateEmployeeDto } from '@/ts';

const defaultValues: CreateEmployeeDto = {
  firstname: '',
  lastname: '',
  birthday: '',
  startDate: '',
  street: '',
  city: '',
  state: '',
  zipCode: undefined,
  department: '',
};

export const HomePage = () => {
  const { control, handleSubmit, reset } = useForm<CreateEmployeeDto>({
    defaultValues,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSubmit = handleSubmit(datas => {
    try {
      employeeService.add({
        id: nanoid(),
        ...datas,
      });
      setOpenModal(true);
    } catch (e) {
      console.warn(e);
    }
  });

  const closeModal = () => {
    reset(defaultValues);
    setOpenModal(false);
  };

  const notZero = (value: CreateEmployeeDto['zipCode']) => {
    if (!value) return true;
    return Number(value) === 0 ? 'change your zip code' : true;
  };

  const isNumber = (value: CreateEmployeeDto['zipCode']) => {
    if (!value) return true;
    return /^\d+$/.test(String(value)) ? true : 'please enter a number';
  };

  return (
    <>
      <form className={s.form} onSubmit={onSubmit}>
        <h2 className={s.title}>Create Employee</h2>
        <h3 className={s.subtitle}>Profile</h3>
        <Container fluid display='flex' wrap='wrap' className={s.row}>
          <InputControlled
            name='firstname'
            control={control}
            rules={{
              required: 'first name is required',
            }}
            label='First Name'
            inputProps={{
              type: 'text',
              'aria-labelledby': 'firstname',
            }}
            classContainer={s.input}
          />
          <InputControlled
            name='lastname'
            control={control}
            rules={{
              required: 'last name is required',
            }}
            label='Last Name'
            inputProps={{
              type: 'text',
              'aria-labelledby': 'lastname',
            }}
            classContainer={s.input}
          />
        </Container>
        <Container fluid display='flex' wrap='wrap' className={s.row}>
          <InputControlled
            name='birthday'
            control={control}
            rules={{
              required: 'date of birth is required',
            }}
            label='Date of Birth'
            inputProps={{
              type: 'date',
              'aria-labelledby': 'birthday',
            }}
            classContainer={s.input}
          />
          <InputControlled
            name='startDate'
            control={control}
            rules={{
              required: 'start date is required',
            }}
            label='Start Date'
            inputProps={{
              type: 'date',
              'aria-labelledby': 'startDate',
            }}
            classContainer={s.input}
          />
        </Container>
        <h3 className={s.subtitle}>Address</h3>
        <Container fluid display='flex' wrap='wrap' className={s.row}>
          <InputControlled
            name='street'
            control={control}
            rules={{}}
            label='Street'
            inputProps={{
              type: 'text',
              'aria-labelledby': 'street',
            }}
            classContainer={s.input}
          />
          <InputControlled
            name='city'
            control={control}
            rules={{}}
            label='City'
            inputProps={{
              type: 'text',
              'aria-labelledby': 'city',
            }}
            classContainer={s.input}
          />
        </Container>
        <Container fluid display='flex' wrap='wrap' className={s.row}>
          <DropdownControlled
            name='state'
            control={control}
            options={states}
            rules={{
              required: 'State is required',
            }}
            label='State'
            placeholder='select the state..'
            classContainer={clsx(s.input, s.index)}
          />
          <InputControlled
            name='zipCode'
            control={control}
            rules={{
              validate: {
                notZero,
                isNumber,
              },
            }}
            label='Zip Code'
            inputProps={{
              type: 'text',
              'aria-labelledby': 'zipCode',
            }}
            classContainer={s.input}
          />
        </Container>
        <h3 className={s.subtitle}>Entreprise</h3>
        <Container fluid display='flex' className={s.row}>
          <DropdownControlled
            name='department'
            control={control}
            options={departments}
            rules={{
              required: 'department is required',
            }}
            label='Department'
            placeholder='select the department..'
            classContainer={s.input}
          />
        </Container>

        <Container
          fluid
          display='flex'
          justify='flex_end'
          className={clsx(s.row, s.footer)}
        >
          <Button label='Save' type='submit' />
        </Container>
      </form>
      <Modal closeButton onClose={closeModal} open={openModal}>
        <Modal.Header>
          <h4 className={s.title}>Employee Created!</h4>
        </Modal.Header>
        <Modal.Body className={s.center}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='10em'
            height='10em'
            viewBox='0 0 24 24'
          >
            <path
              fill='var(--clr-green)'
              d='m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68L23 12m-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8Z'
            ></path>
          </svg>
        </Modal.Body>
      </Modal>
    </>
  );
};
